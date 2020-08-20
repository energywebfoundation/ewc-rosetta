import {
  Body,
  Controller,
  HttpException,
  Post,
  HttpCode,
} from "@nestjs/common";

import { BlockRequest } from "../models/BlockRequest";
import { BlockTransactionRequest } from "../models/BlockTransactionRequest";
import { BlockService } from "./block.service";

@Controller("block")
export class BlockController {
  constructor(private blockService: BlockService) {}

  @Post()
  @HttpCode(200)
  public async getBlock(@Body() body: BlockRequest) {
    const validationResult = await BlockRequest.validate(body);

    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    return this.blockService.getBlock(body.block_identifier?.index);
  }

  @Post("transaction")
  @HttpCode(200)
  public async getTransaction(@Body() body: BlockTransactionRequest) {
    return this.blockService.getBlockTransaction(
      body.block_identifier.index,
      body.transaction_identifier.hash
    );
  }
}
