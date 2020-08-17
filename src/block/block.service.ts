import { Injectable } from "@nestjs/common";
import { providers } from "ethers";
import { Block } from "src/models/Block";
import { OperationFactory } from "src/models/OperationFactory";
import { PartialBlockIdentifier } from "src/models/PartialBlockIdentifier";
import { Transaction } from "src/models/Transaction";
import { TransactionIdentifier } from "src/models/TransactionIdentifer";
import { getRPCProvider } from "src/utils/client";

import { RewardService } from "./reward.service";

@Injectable()
export class BlockService {
  constructor(private rewardService: RewardService) {}

  public async getBlock(block?: number) {
    const provider = getRPCProvider();
    const {
      transactions,
      miner,
      timestamp,
      parentHash,
      hash,
      number: blockNumber,
    } = await provider.getBlockWithTransactions(block || "latest");

    const parent = await provider.getBlock(parentHash);

    const receipts = await Promise.all(
      transactions.map((tx) => provider.getTransactionReceipt(tx.hash))
    );

    const operationFactory = new OperationFactory();

    const blockTransaction = await this.buildBlockTransactions(
      miner,
      receipts,
      transactions,
      operationFactory
    );

    const rewardTransaction = await this.getRewardTransaction(
      blockNumber,
      miner,
      operationFactory
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

    const receipt = await transaction.wait();
    const block = await provider.getBlock(blockNumber);

    const blockTransaction = await this.buildBlockTransactions(
      block.miner,
      [receipt],
      [transaction],
      new OperationFactory()
    );

    return {
      transaction: blockTransaction,
    };
  }

  private async getRewardTransaction(
    blockNumber: number,
    miner: string,
    operationFactory: OperationFactory
  ) {
    const blockRewards = await this.rewardService.calculateBlockRewards(
      miner,
      blockNumber
    );

    return new Transaction(
      null,
      blockRewards.flatMap(({ address, value }) =>
        operationFactory.reward(address, value)
      )
    );
  }

  private async buildBlockTransactions(
    miner: string,
    receipts: providers.TransactionReceipt[],
    transactions: providers.TransactionResponse[],
    operationFactory: OperationFactory
  ) {
    const transactionCache = transactions
      .filter((tx) => !tx.value.isZero())
      .reduce(
        (map, tx) => map.set(tx.hash, tx),
        new Map<string, providers.TransactionResponse>()
      );

    return receipts.map((tx) => {
      const { value, gasPrice } = transactionCache.get(tx.transactionHash);
      const { gasUsed, status, from, to } = tx;
      const feeValue = gasPrice.mul(gasUsed);
      const success = status === 1;

      const transfer = !value.isZero()
        ? operationFactory.transferEWT(from, to, value, success)
        : [];
      const fee = operationFactory.fee(from, miner, feeValue);

      return new Transaction(new TransactionIdentifier(tx.transactionHash), [
        ...transfer,
        ...fee,
      ]);
    });
  }
}
