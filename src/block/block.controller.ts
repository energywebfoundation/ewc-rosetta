import { Controller, Post, Body } from "@nestjs/common";
import { providers } from "ethers";

import { BlockRequest } from "src/models/BlockRequest";
import { getRPCProvider } from "src/utils/client";
import { Block } from "src/models/Block";
import { PartialBlockIdentifier } from "src/models/PartialBlockIdentifier";
import { Transaction } from "src/models/Transaction";
import { TransactionIdentifier } from "src/models/TransactionIdentifer";
import { Operation } from "src/models/Operation";

@Controller("block")
export class BlockController {
  @Post()
  public async getBlock(@Body() body: BlockRequest) {
    const provider = getRPCProvider();
    const block = await provider.getBlockWithTransactions(
      body.block_identifier.index
    );
    const parent = await provider.getBlock(block.parentHash);

    let transactionIndex = 0;

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

    const blockTransaction = receipts.map((tx) => {
      const { value, gasPrice } = transactions.get(tx.transactionHash);
      const { gasUsed, status, from, to } = tx;
      const fee = gasPrice.mul(gasUsed);

      const operations: Operation[] = [];

      if (!value.isZero()) {
        operations.push(
          Operation.TransferEWT(
            transactionIndex++,
            from,
            value.mul(-1),
            status === 0
          ),
          Operation.TransferEWT(transactionIndex++, to, value, status === 0)
        );
      }

      operations.push(
        Operation.Fee(transactionIndex++, from, fee.mul(-1)),
        Operation.Fee(transactionIndex++, block.miner, fee)
      );

      return new Transaction(
        new TransactionIdentifier(tx.transactionHash),
        operations
      );
    });

    return {
      block: new Block(
        new PartialBlockIdentifier(block.number, block.hash),
        new PartialBlockIdentifier(parent.number, parent.hash),
        block.timestamp,
        blockTransaction
      ),
    };
  }
}
