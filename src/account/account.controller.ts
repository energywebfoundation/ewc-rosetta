import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { AccountResponse } from "../models/AccountResponse";
import { Error as ErrorResponse } from "../models/Error";
import { AccountRequest } from "../models/AccountRequest";
import { AccountService } from "./account.service";

@Controller("account")
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post("balance")
  @HttpCode(200)
  @ApiResponse({
    status: HttpStatus.OK,
    type: AccountResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponse
  })
  public async getBalance(@Body() body: AccountRequest) {
    const validationResult = await AccountRequest.validate(body);

    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    return this.accountService.getBalance(
      body.account_identifier.address,
      body.block_identifier?.index
    );
  }
}
