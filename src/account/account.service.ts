import { Injectable } from "@nestjs/common";
import { getRPCProvider } from "../utils/client";
import { Currency } from "../models/Currency";
import { PartialBlockIdentifier } from "../models/PartialBlockIdentifier";

@Injectable()
export class AccountService {

  public async getBalance(accountAddress: string, blockNumber?: number) {
    const provider = getRPCProvider()

    const block = await provider.getBlock(blockNumber ?? "latest");
    const balance = await provider.getBalance(accountAddress, block.number);

    return {
      "block_identifier": new PartialBlockIdentifier(block.number, block.hash),
      "balances": [{value: balance.toString(), currency: Currency.EWT}]
    }

  }

}