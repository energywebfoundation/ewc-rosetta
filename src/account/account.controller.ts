import { Controller, Body, Post } from "@nestjs/common";
import { ethers } from "ethers";
import { AccountRequest } from "src/models/AccountRequest";
import { getRPCProvider } from "src/utils/client";

@Controller("account")
export class AccountController {
  
  @Post("balance")
  public async getBalance(@Body() body: AccountRequest) {
    const provider = getRPCProvider()
    let block_identifier = {}
    let balances = []
    
    if (body.block_identifier != undefined){      
      // historical balance lookup
      // todo
           
    } else {    
      // latest balance loookup
      const block_number = await provider.getBlockNumber()      
      await provider.getBlock(block_number).then(block => {
        block_identifier = {
          index: block.number,
          hash: block.hash,
        }        
      })
      await provider.getBalance(
        body.account_identifier.address).then(balance => {          
          balances.push({
            value: ethers.utils.formatEther(balance),
              currency: {
                  symbol: "EWT",
                  decimals: 18,
                  metadata: {}
              },
              metadata: {}
          }) 
      })
    }

    return {
      block_identifier: block_identifier,
      balances: balances,
      coins: {},
      metadata: {},
    };
  }
}
