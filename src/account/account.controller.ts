import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpCode,
} from "@nestjs/common";
import { AccountRequest } from "../models/AccountRequest";
import { AccountService } from "./account.service";

@Controller("account")
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post("balance")
  @HttpCode(200)
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
