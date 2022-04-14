import {
  Body,
  Controller,
  HttpException,
  Post,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { BlockTransactionResponse } from "../models/BlockTransactionResponse";
import { Error as ErrorResponse } from "../models/Error";

import { BlockRequest } from "../models/BlockRequest";
import { BlockTransactionRequest } from "../models/BlockTransactionRequest";
import { BlockService } from "./block.service";
import { BlockResponse } from "../models/BlockResponse";

@Controller("block")
export class BlockController {
  constructor(private blockService: BlockService) {}

  @Post()
  @HttpCode(200)
  @ApiResponse({
    type: BlockResponse,
    status: HttpStatus.OK
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponse
  })
  public async getBlock(@Body() body: BlockRequest): Promise<BlockResponse> {
    const validationResult = await BlockRequest.validate(body);

    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    return this.blockService.getBlock(body.block_identifier?.index);
  }

  @Post("transaction")
  @HttpCode(200)
  @ApiResponse({
    type: BlockTransactionResponse,
    status: HttpStatus.OK
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponse
  })
  public async getTransaction(@Body() body: BlockTransactionRequest) {
    const validationResult = await BlockTransactionRequest.validate(body);

    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    return this.blockService.getBlockTransaction(
      body.block_identifier.index,
      body.transaction_identifier.hash
    );
  }
}
