import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { getRPCProvider } from "../utils/client";
import { TransactionIdentifier } from "../models/TransactionIdentifer";
import { OperationFactory } from "../models/OperationFactory";
import { Transaction } from "../models/Transaction";

@Injectable()
export class MempoolService {
  
  private provider = getRPCProvider();
  private mempool:TransactionIdentifier[] = [];  

  constructor() {        

    this.provider.on("pending", (tx) => {      
      this.mempool.push(new TransactionIdentifier(tx.hash))      
    })
    
  }

  public async getAllTransactions() {
    return {
      "transaction_identifiers": this.mempool      
    }
  }

  public async getTransaction(transactionHash: string) {            
    
    const transaction = await this.provider.getTransaction(transactionHash)
    const operationFactory = new OperationFactory()

    const transfer = operationFactory.transferEWT(transaction.from, transaction.to, transaction.value, true);
    
    return {
      "tansaction": new Transaction(new TransactionIdentifier(transaction.hash), [
      ...transfer])
    }
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  mempoolWatchCron() {

    this.mempool.forEach(tx => {
      this.provider.getTransaction(tx.hash).then(transaction => {
        if (transaction && transaction.blockNumber && transaction.confirmations > 0){          
          this.mempool.splice(this.mempool.findIndex(x => x.hash === transaction.hash) , 1)
        }
        
      })      
    })
  }

}