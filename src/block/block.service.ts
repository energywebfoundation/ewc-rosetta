import { Injectable, Logger } from "@nestjs/common";
import { providers, BigNumber, utils } from "ethers";

import { Block } from "../models/Block";
import { OperationFactory } from "../models/OperationFactory";
import { PartialBlockIdentifier } from "../models/PartialBlockIdentifier";
import { Transaction } from "../models/Transaction";
import { TransactionIdentifier } from "../models/TransactionIdentifer";
import { getRPCProvider } from "../utils/client";
import { RewardService } from "./reward.service";
import { withRetry } from "../utils/withRetry";
import { Operation } from "../models/Operation";

@Injectable()
export class BlockService {
    private provider = getRPCProvider();
    private readonly logger = new Logger(BlockService.name);

    constructor(private rewardService: RewardService) {
    }

    public async getBlock(block?: number) {
        const {
            transactions,
            miner,
            timestamp,
            parentHash,
            hash,
            number: blockNumber,
        } = await withRetry(() => this.provider.getBlockWithTransactions(block ?? 'latest'));

        const parent = await withRetry(() => this.provider.getBlock(parentHash))

        const blockTransaction = await this.buildBlockTransactions(
            miner,
            transactions
        );

        const rewardTransaction = await this.getRewardTransaction(
            blockNumber,
            hash,
            miner
        );

        return {
            block: new Block(
                new PartialBlockIdentifier(blockNumber, hash),
                new PartialBlockIdentifier(parent?.number ?? blockNumber, parent?.hash ?? hash),
                timestamp * 1000,
                [...blockTransaction, rewardTransaction]
            ),
        };
    }

    public async getBlockTransaction(
        blockNumber: number,
        transactionHash: string
    ) {
        const transaction = await withRetry(() => this.provider.getTransaction(transactionHash));
        if (transaction) {
            if (transaction.blockNumber !== blockNumber) {
                throw new Error("Blocknumber mismatch");
            }

            const block = await withRetry(() => this.provider.getBlock(blockNumber));

            const blockTransaction = await this.buildBlockTransactions(block.miner, [
                transaction,
            ]);

            return {
                transaction: blockTransaction,
            };
        }

        const block = await withRetry(() => this.provider.getBlock(transactionHash));

        return {
            transaction: await this.getRewardTransaction(
                block.number,
                block.hash,
                block.miner
            ),
        };
    }

    private async getRewardTransaction(
        blockNumber: number,
        blockHash: string,
        miner: string
    ) {
        const blockRewards = await this.rewardService.calculateBlockRewards(
            miner,
            blockNumber
        );

        const operationFactory = new OperationFactory();

        return new Transaction(
            new TransactionIdentifier(blockHash),
            blockRewards.flatMap(({ address, value }) =>
                operationFactory.reward(address, value)
            )
        );
    }

    private async buildBlockTransactions(
        miner: string,
        transactions: providers.TransactionResponse[]
    ) {
        const receipts = await Promise.all(
            transactions.map((tx) => withRetry(() => this.provider.getTransactionReceipt(tx.hash)))
        );

        const transactionCache = transactions.reduce(
            (map, tx) => map.set(tx.hash, tx),
            new Map<string, providers.TransactionResponse>()
        );

        return Promise.all(receipts.map(async (tx) => {
            const operationFactory = new OperationFactory();
            const { value, gasPrice, data } = transactionCache.get(tx.transactionHash);
            const { gasUsed, status, from, to, contractAddress } = tx;
            const feeValue = gasPrice.mul(gasUsed);
            const success = status === 1;

            let transfers = [];

            if (data != '0x') {
                try {
                    const trace = await withRetry(() => this.provider.send('trace_transaction', [tx.transactionHash]));
                    transfers = this.traceToTransfers(trace, operationFactory);
                } catch (e) {
                    this.logger.error(`Parsing trace output for tx ${tx.transactionHash} failed with error ${e.toString()}`);
                }
            } else {
                transfers = operationFactory.transferEWT(
                    from,
                    to ?? contractAddress,
                    value,
                    success
                );
            }

            const fee = operationFactory.fee(from, miner, feeValue);

            return new Transaction(new TransactionIdentifier(tx.transactionHash), [
                ...transfers,
                ...fee,
            ]);
        }
        ))
    }

    private traceToTransfers(trace: any, operationFactory: OperationFactory): Operation[] {
        const internalTransfers = trace.filter(t => !t.error && (t.action.value != '0x0' || t.type === 'suicide'));

        return internalTransfers.map(tx => {
            let from, value, to;

            if (tx.type === "create") {
                from = tx.action.from;
                to = tx.result.address;
                value = tx.action.value;
            } else if (tx.type == "suicide") {
                from = tx.action.address;
                to = tx.action.refundAddress;
                value = tx.action.balance;
            } else {
                from = tx.action.from;
                to = tx.action.to;
                value = tx.action.value;
            }

            return operationFactory.transferEWT(
                utils.getAddress(from),
                utils.getAddress(to),
                BigNumber.from(value),
                true
            );
        }).flat()
    }
}
