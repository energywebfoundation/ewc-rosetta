import { Injectable } from "@nestjs/common";
import { getRPCProvider } from "src/utils/client";
import { providers } from "ethers";
import { Operation } from "src/models/Operation";
import { OperationFactory } from "src/models/OperationFactory";
import { Transaction } from "src/models/Transaction";
import { TransactionIdentifier } from "src/models/TransactionIdentifer";
import { RewardService } from "./reward.service";
import { Block } from "src/models/Block";
import { PartialBlockIdentifier } from "src/models/PartialBlockIdentifier";

@Injectable()
export class BlockService {
  constructor(private rewardService: RewardService) {}

  public async getBlock(blockNumber: number) {
    const provider = getRPCProvider();
    const block = await provider.getBlockWithTransactions(blockNumber);
    const parent = await provider.getBlock(block.parentHash);

    const transactions = block.transactions
      .filter((tx) => !tx.value.isZero())
      .reduce(
        (map, tx) => map.set(tx.hash, tx),
        new Map<string, providers.TransactionResponse>()
      );

    const receipts = await Promise.all(
      Array.from(transactions.values()).map((tx) =>
        provider.getTransactionReceipt(tx.hash)
      )
    );

    const operationFactory = new OperationFactory();

    const blockTransaction = receipts.map((tx) => {
      const { value, gasPrice } = transactions.get(tx.transactionHash);
      const { gasUsed, status, from, to } = tx;
      const feeValue = gasPrice.mul(gasUsed);
      const success = status === 1;

      const transfer = !value.isZero()
        ? operationFactory.transferEWT(from, to, value, success)
        : [];
      const fee = operationFactory.fee(from, block.miner, feeValue);

      return new Transaction(new TransactionIdentifier(tx.transactionHash), [
        ...transfer,
        ...fee,
      ]);
    });

    const rewardTransaction = await this.getRewardTransaction(
      blockNumber,
      block.miner,
      operationFactory
    );

    return {
      block: new Block(
        new PartialBlockIdentifier(block.number, block.hash),
        new PartialBlockIdentifier(parent.number, parent.hash),
        block.timestamp,
        [...blockTransaction, rewardTransaction]
      ),
    };
  }

  private async getRewardTransaction(
    blockNumber: number,
    miner: string,
    operationFactory: OperationFactory
  ) {
    const minerReward = await this.rewardService.calculateBlockRewards(
      miner,
      blockNumber
    );

    return new Transaction(
      null,
      operationFactory.reward(minerReward.address, minerReward.value)
    );
  }
}
