import { Injectable } from "@nestjs/common";
import { getRPCProvider } from "../utils/client";
import { Currency } from "../models/Currency";
import { utils } from "ethers";
import { PartialBlockIdentifier } from "../models/PartialBlockIdentifier";

@Injectable()
export class AccountService {

  public async getBalance(account: string, block?: number) {
    const provider = getRPCProvider()
    let blockIdentifier = new PartialBlockIdentifier()
    let balances = []
    
    if (block){      
      // historical balance lookup
      // todo
           
    } else {    
      // latest balance loookup
      const blockNumber = await provider.getBlockNumber()      
      await provider.getBlock(blockNumber).then(block => {
        blockIdentifier.index = block.number
        blockIdentifier.hash = block.hash          
      })
      await provider.getBalance(
        account).then(balance => {          
          balances.push({
            value: utils.formatEther(balance),
            currency: Currency.EWT,
            metadata: {}
          }) 
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