import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { Error as ErrorResponse } from "../models/Error";
import { MempoolResponse, MempoolTransactionResponse } from "../models/MempoolResponse";
import { MainMempoolRequest, MempoolRequest } from "../models/MempoolRequest";
import { MempoolService } from "./mempool.service";

@Controller("mempool")
export class MempoolController {
  constructor(private mempoolService: MempoolService) {}

  @Post()
  @HttpCode(200)
  @ApiBody({ type: MainMempoolRequest })
  @ApiResponse({
     status: HttpStatus.INTERNAL_SERVER_ERROR,
     type: ErrorResponse
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: MempoolResponse
  })
  public async getAllTransactions(@Body() body: MempoolRequest) {
    const validationResult = await MempoolRequest.validate(body);

    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    return this.mempoolService.getAllTransactions();
  }

  @Post("transaction")
  @HttpCode(200)
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponse
 })
 @ApiResponse({
   status: HttpStatus.OK,
   type: MempoolTransactionResponse
 })
  public async getTransaction(@Body() body: MempoolRequest) {
    const validationResult = await MempoolRequest.validate(body);

    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    return this.mempoolService.getTransaction(
      body.transaction_identifier?.hash
    );
  }
}
