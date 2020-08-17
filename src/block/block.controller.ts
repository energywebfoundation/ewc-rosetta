import { Body, Controller, Post } from "@nestjs/common";
import { BlockRequest } from "src/models/BlockRequest";

import { BlockService } from "./block.service";

@Controller("block")
export class BlockController {
  constructor(private blockService: BlockService) {}

  @Post()
  public async getBlock(@Body() body: BlockRequest) {
    return this.blockService.getBlock(body.block_identifier.index);
  }
}
