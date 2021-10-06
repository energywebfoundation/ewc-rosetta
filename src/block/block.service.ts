import {Injectable} from "@nestjs/common";
import {providers} from "ethers";

import {Block} from "../models/Block";
import {OperationFactory} from "../models/OperationFactory";
import {PartialBlockIdentifier} from "../models/PartialBlockIdentifier";
import {Transaction} from "../models/Transaction";
import {TransactionIdentifier} from "../models/TransactionIdentifer";
import {getRPCProvider} from "../utils/client";
import {RewardService} from "./reward.service";
import {withRetry} from "../utils/withRetry";

@Injectable()
export class BlockService {
    private provider = getRPCProvider();

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
        } = await withRetry(() => this.provider.getBlockWithTransactions(block || "latest"));

        const parent = await withRetry(() => this.provider.getBlock(parentHash));

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
                new PartialBlockIdentifier(parent.number, parent.hash),
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
            blockRewards.flatMap(({address, value}) =>
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

        return receipts.map((tx) => {
            const operationFactory = new OperationFactory();
            const {value, gasPrice} = transactionCache.get(tx.transactionHash);
            const {gasUsed, status, from, to, contractAddress} = tx;
            const feeValue = gasPrice.mul(gasUsed);
            const success = status === 1;

            const transfer = operationFactory.transferEWT(
                from,
                to ?? contractAddress,
                value,
                success
            );
            const fee = operationFactory.fee(from, miner, feeValue);

            return new Transaction(new TransactionIdentifier(tx.transactionHash), [
                ...transfer,
                ...fee,
            ]);
        });
    }
}
