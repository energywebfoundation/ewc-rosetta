import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { providers } from "ethers";
import { getRPCProvider } from "../utils/client";
import { TransactionIdentifier } from "../models/TransactionIdentifer";
import { OperationFactory } from "../models/OperationFactory";
import { Transaction } from "../models/Transaction";
import { Errors } from "../models/Errors";

@Injectable()
export class MempoolService {
  
  private provider = getRPCProvider();
  private transactionCache: Map<string, providers.TransactionResponse> = new Map<string, providers.TransactionResponse>();

  constructor() {        

    this.provider.on("pending", (tx) => {      
      this.transactionCache.set(tx.hash, tx as providers.TransactionResponse)      
    });

    this.provider.on("block", (blockNumber) => {
      this.provider.getBlockWithTransactions(blockNumber).then(block => {
        block.transactions.forEach(transaction => {          
          this.transactionCache.delete(transaction.hash)
        });
      });   
    });
    
  }

  public async getAllTransactions() {    
  
    let transactionIdentifiers: TransactionIdentifier[] = [];

    [ ...this.transactionCache.keys() ].forEach(tx => {
      transactionIdentifiers.push(new TransactionIdentifier(tx))
    });

    return {
      "transaction_identifiers": transactionIdentifiers
    }
  }


  public async getTransaction(transactionHash: string) {                
    
    if (!this.transactionCache.has(transactionHash)){
      return Errors.TX_NOT_FOUND;
    }
    
    const transaction = await this.provider.getTransaction(transactionHash);

    const operationFactory = new OperationFactory();

    const transfer = operationFactory.transferEWT(transaction.from, transaction.to, transaction.value, true);
    
    return {
      "transaction": new Transaction(new TransactionIdentifier(transaction.hash), [
      ...transfer])
    }
  }


  @Cron(CronExpression.EVERY_30_SECONDS)
  mempoolWatchCron() {

    this.transactionCache.forEach(tx => {
      this.provider.getTransaction(tx.hash).then(transaction => {

        if (transaction && transaction.blockNumber && transaction.confirmations > 0){          
          this.transactionCache.delete(transaction.hash);
        }        
      });
    });
  }

}