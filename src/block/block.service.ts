import { Injectable, Logger } from '@nestjs/common'
import { providers, BigNumber, utils } from 'ethers'

import { Block } from '../models/Block'
import { OperationFactory } from '../models/OperationFactory'
import { PartialBlockIdentifier } from '../models/PartialBlockIdentifier'
import { Transaction } from '../models/Transaction'
import { TransactionIdentifier } from '../models/TransactionIdentifer'
import { getRPCProvider } from '../utils/client'
import { RewardService } from './reward.service'
import { withRetry } from '../utils/withRetry'
import { Operation } from '../models/Operation'
import {
  BlockWithTransactions,
  CallType,
  EthTrace,
  TransferCallType,
} from './block.types'

@Injectable()
export class BlockService {
  private provider = getRPCProvider()
  private readonly logger = new Logger(BlockService.name)

  constructor(private rewardService: RewardService) { }

  public async getBlock(block?: number) {
    const [
      { transactions, miner, timestamp, parentHash, hash, number: blockNumber },
      { baseFeePerGas },
    ] = await Promise.all([
      withRetry(() =>
        this.provider.getBlockWithTransactions(block ?? 'latest')
      ),
      withRetry<BlockWithTransactions>(() =>
        this.provider.send('eth_getBlockByNumber', [
          block !== null ? `0x${block.toString(16)}` : 'latest',
          false,
        ])
      ),
    ])

    const parent = await withRetry(() => this.provider.getBlock(parentHash))

    const blockTransaction = await this.buildBlockTransactions(
      miner,
      transactions,
      BigNumber.from(baseFeePerGas || 0)
    )

    const rewardTransaction = await this.getRewardTransaction(
      blockNumber,
      hash,
      miner
    )

    return {
      block: new Block(
        new PartialBlockIdentifier(blockNumber, hash),
        new PartialBlockIdentifier(
          parent?.number ?? blockNumber,
          parent?.hash ?? hash
        ),
        timestamp * 1000,
        [...blockTransaction, rewardTransaction]
      ),
    }
  }

  public async getBlockTransaction(
    blockNumber: number,
    transactionHash: string
  ) {
    const transaction = await withRetry(() =>
      this.provider.getTransaction(transactionHash)
    )
    if (transaction) {
      if (transaction.blockNumber !== blockNumber) {
        throw new Error('Blocknumber mismatch')
      }

      const { miner, baseFeePerGas } = await withRetry<BlockWithTransactions>(
        () =>
          this.provider.send('eth_getBlockByNumber', [
            blockNumber !== null ? `0x${blockNumber.toString(16)}` : 'latest',
            false
          ])
      )

      const blockTransaction = await this.buildBlockTransactions(
        miner,
        [transaction],
        BigNumber.from(baseFeePerGas || 0)
      )

      return {
        transaction: blockTransaction,
      }
    }

    const block = await withRetry(() => this.provider.getBlock(transactionHash))

    return {
      transaction: await this.getRewardTransaction(
        block.number,
        block.hash,
        block.miner
      ),
    }
  }

  private async getRewardTransaction(
    blockNumber: number,
    blockHash: string,
    miner: string
  ) {
    const blockRewards = await this.rewardService.calculateBlockRewards(
      miner,
      blockNumber
    )

    const operationFactory = new OperationFactory()

    return new Transaction(
      new TransactionIdentifier(blockHash),
      blockRewards.flatMap(({ address, value }) =>
        operationFactory.reward(address, value)
      )
    )
  }

  private async buildBlockTransactions(
    miner: string,
    transactions: providers.TransactionResponse[],
    baseFeePerGas: BigNumber
  ) {
    const receipts = await Promise.all(
      transactions.map((tx) =>
        withRetry(() => this.provider.getTransactionReceipt(tx.hash))
      )
    )

    const transactionCache = transactions.reduce(
      (map, tx) => map.set(tx.hash, tx),
      new Map<string, providers.TransactionResponse>()
    )

    return Promise.all(
      receipts.map(async (tx) => {
        const operationFactory = new OperationFactory()
        const { gasPrice } = transactionCache.get(
          tx.transactionHash
        )
        const { gasUsed, status, from } = tx
        const feeValue = BigNumber.from(gasPrice).mul(gasUsed)
        const feeBurned = gasUsed.mul(baseFeePerGas)
        const feeReward = feeValue.sub(feeBurned)
        const success = status === 1

        let transfers: Operation[] = []

        try {
          const traces = await withRetry<EthTrace[]>(() =>
            this.provider.send('trace_transaction', [tx.transactionHash])
          )
          transfers = this.traceToTransfers(traces, operationFactory, success)
        } catch (e) {
          this.logger.error(
            `Parsing trace output for tx ${tx.transactionHash
            } failed with error ${e.toString()}`
          )
        }

        const fee = operationFactory.fee({ from, miner, value: feeReward })

        if (!feeBurned.isZero()) {
          fee.push(...operationFactory.fee({ from, value: feeBurned }))
        }

        return new Transaction(new TransactionIdentifier(tx.transactionHash), [
          ...transfers,
          ...fee,
        ])
      })
    )
  }

  private traceToTransfers(
    traces: EthTrace[],
    operationFactory: OperationFactory,
    success: boolean
  ): Operation[] {
    const operations: Operation[] = []

    if (traces.length < 1) {
      return []
    }
    for (const trace of traces) {
      const zeroValue = trace.action.value == '0x0'
      const isCallType = CallType.has(trace.type.toUpperCase())

      const isOperationValid =
        isCallType && Boolean(trace.action.callType) && !zeroValue
          ? TransferCallType.has(trace.action.callType?.toUpperCase())
          : true

      const shouldAddOperation = !(zeroValue && isCallType)

      if (shouldAddOperation && isOperationValid) {
        let from: string
        let to: string | null
        let value: string

        const isTransferSuccessful = Boolean(trace.error) ? false : success

        if (!isCallType && !isTransferSuccessful && zeroValue) {
          continue;
        }

        if (trace.type === 'create') {
          from = trace.action.from
          to = trace.result.address
          value = trace.action.value
        } else if (trace.type == 'suicide') {
          from = trace.action.address
          to = trace.action.address === trace.action.refundAddress ? null : trace.action.refundAddress
          value = trace.action.balance
        } else {
          from = trace.action.from
          to = trace.action.to
          value = trace.action.value
        }

        const newOperations = operationFactory.transferEWT(
          utils.getAddress(from),
          to && utils.getAddress(to),
          BigNumber.from(value),
          isTransferSuccessful
        )

        operations.push(...newOperations)
      }
    }
    return operations
  }
}
