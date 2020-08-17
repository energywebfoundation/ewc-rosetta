import { Body, Controller, Post } from "@nestjs/common";
import { BlockRequest } from "src/models/BlockRequest";

import { BlockService } from "./block.service";
import { BlockTransactionRequest } from "src/models/BlockTransactionRequest";

@Controller("block")
export class BlockController {
  constructor(private blockService: BlockService) {}

  @Post()
  public async getBlock(@Body() body: BlockRequest) {
    return this.blockService.getBlock(body.block_identifier.index);
  }

  @Post("transaction")
  public async getTransaction(@Body() body: BlockTransactionRequest) {
    return this.blockService.getBlockTransaction(
      body.block_identifier.index,
      body.transaction_identifier.hash
    );
  }
}
