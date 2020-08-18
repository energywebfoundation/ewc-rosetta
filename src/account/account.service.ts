import { Injectable } from "@nestjs/common";
import { getRPCProvider } from "../utils/client";
import { Currency } from "../models/Currency";
import { PartialBlockIdentifier } from "../models/PartialBlockIdentifier";
import { Amount } from "../models/Amount";

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
      const block_number = await provider.getBlockNumber()      
      await provider.getBlock(block_number).then(block => {
        blockIdentifier.index = block.number
        blockIdentifier.hash = block.hash          
      })
      await provider.getBalance(
        account).then(balance => {          
          balances.push({
            value: new Amount(balance.mul(-1).toString(), Currency.EWT),
            currency: Currency.EWT,
            metadata: {}
          }) 
      })
    }

    return {
      block_identifier: blockIdentifier,
      balances: balances,
      coins: {},
      metadata: {},
    };
  }

}