import { Injectable } from "@nestjs/common";
import { providers } from "ethers";

import { Block } from "../models/Block";
import { OperationFactory } from "../models/OperationFactory";
import { PartialBlockIdentifier } from "../models/PartialBlockIdentifier";
import { Transaction } from "../models/Transaction";
import { TransactionIdentifier } from "../models/TransactionIdentifer";
import { getRPCProvider } from "../utils/client";
import { RewardService } from "./reward.service";

@Injectable()
export class BlockService {
  private provider = getRPCProvider();

  constructor(private rewardService: RewardService) {}

  public async getBlock(block?: number) {
    const {
      transactions,
      miner,
      timestamp,
      parentHash,
      hash,
      number: blockNumber,
    } = await this.provider.getBlockWithTransactions(block || "latest");

    const parent = await this.provider.getBlock(parentHash);

    const blockTransaction = await this.buildBlockTransactions(
      miner,
      transactions
    );

    const rewardTransaction = await this.getRewardTransaction(
      blockNumber,
      miner
    );

    return {
      block: new Block(
        new PartialBlockIdentifier(blockNumber, hash),
        new PartialBlockIdentifier(parent.number, parent.hash),
        timestamp,
        [...blockTransaction, rewardTransaction]
      ),
    };
  }

  public async getBlockTransaction(
    blockNumber: number,
    transactionHash: string
  ) {
    const provider = getRPCProvider();

    const transaction = await provider.getTransaction(transactionHash);

    if (transaction.blockNumber !== blockNumber) {
      throw new Error("Blocknumber mismatch");
    }

    const block = await provider.getBlock(blockNumber);

    const blockTransaction = await this.buildBlockTransactions(block.miner, [
      transaction,
    ]);

    return {
      transaction: blockTransaction,
    };
  }

  private async getRewardTransaction(blockNumber: number, miner: string) {
    const blockRewards = await this.rewardService.calculateBlockRewards(
      miner,
      blockNumber
    );

    const operationFactory = new OperationFactory();

    return new Transaction(
      null,
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
      transactions.map((tx) => this.provider.getTransactionReceipt(tx.hash))
    );

    const transactionCache = transactions.reduce(
      (map, tx) => map.set(tx.hash, tx),
      new Map<string, providers.TransactionResponse>()
    );

    return receipts.map((tx) => {
      const operationFactory = new OperationFactory();
      const { value, gasPrice } = transactionCache.get(tx.transactionHash);
      const { gasUsed, status, from, to } = tx;
      const feeValue = gasPrice.mul(gasUsed);
      const success = status === 1;

      const transfer = operationFactory.transferEWT(from, to, value, success);
      const fee = operationFactory.fee(from, miner, feeValue);

      return new Transaction(new TransactionIdentifier(tx.transactionHash), [
        ...transfer,
        ...fee,
      ]);
    });
  }
}
