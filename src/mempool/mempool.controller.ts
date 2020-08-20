import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpCode,
} from "@nestjs/common";
import { MempoolRequest } from "../models/MempoolRequest";
import { MempoolService } from "./mempool.service";

@Controller("mempool")
export class MempoolController {
  constructor(private mempoolService: MempoolService) {}

  @Post()
  @HttpCode(200)
  public async getAllTransactions(@Body() body: MempoolRequest) {
    const validationResult = await MempoolRequest.validate(body);

    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    return this.mempoolService.getAllTransactions();
  }

  @Post("transaction")
  @HttpCode(200)
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
