import { Injectable } from "@nestjs/common";
import { getRPCProvider } from "../utils/client";

@Injectable()
export class MempoolService {

  public async getAllTransactions() {
    const provider = getRPCProvider()    
    
    return {
      "transaction_identifiers": {}      
    }

  }

  public async getTransaction(transactionHash: string) {
    const provider = getRPCProvider()    
    
    return {
      "transaction_identifiers": {}
    }

  }

}