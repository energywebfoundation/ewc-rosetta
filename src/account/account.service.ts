import { Injectable } from "@nestjs/common";
import { utils } from "ethers";
import { getRPCProvider } from "../utils/client";
import { Currency } from "../models/Currency";
import { Errors } from "../models/Errors";
import { PartialBlockIdentifier } from "../models/PartialBlockIdentifier";

@Injectable()
export class AccountService {

  public async getBalance(accountAddress: string, blockNumber?: number) {
    const provider = getRPCProvider()
    let blockIdentifier = new PartialBlockIdentifier()
    let balances = []
    
    if (blockNumber){      
      // historical balance lookup            
      const block = await provider.getBlock(blockNumber)      
      
      if (!block || (block.number !== blockNumber)) {        
        return Errors.BLOCK_NOT_FOUND;  
      }
      blockIdentifier.index = block.number
      blockIdentifier.hash = block.hash

      const balance = await provider.getBalance(accountAddress, blockIdentifier.index)      
      balances.push({
        value: utils.formatEther(balance),
        currency: Currency.EWT,
        metadata: {}
      })

    } else {    
      // latest balance loookup
      const blockNumber = await provider.getBlockNumber()      
      
      const block = await provider.getBlock(blockNumber)
      blockIdentifier.index = block.number
      blockIdentifier.hash = block.hash

      const balance = await provider.getBalance(accountAddress)                
      balances.push({
        value: utils.formatEther(balance),
        currency: Currency.EWT,
        metadata: {}
      })

    }

    return {
      block: blockIdentifier,
      balances: balances,
      coins: {},
      metadata: {},
    };
  }

}