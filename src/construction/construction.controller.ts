import { Body, Controller, HttpException, Post } from "@nestjs/common";
import { ConstructionDeriveRequest } from "../models/ConstructionDeriveRequest";

import { ConstructionService } from "./construction.service";
import { ConstructionHashRequest } from "../models/ConstructionHashRequest";
import { TransactionIdentifier } from "../models/TransactionIdentifer";

@Controller("construction")
export class ConstructionController {
  constructor(private constructionService: ConstructionService) {}

  @Post("/derive")
  public async derive(@Body() request: ConstructionDeriveRequest) {
    const validationResult = ConstructionDeriveRequest.validate(request);

    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    const address = this.constructionService.derive(
      request.public_key.hex_bytes
    );

    return {
      address,
    };
  }

  @Post("/hash")
  public async hash(@Body() request: ConstructionHashRequest) {
    const validationResult = ConstructionHashRequest.validate(request);

    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    const hash = this.constructionService.hash(request.signed_transaction);

    return {
      transaction_identifier: new TransactionIdentifier(hash),
    };
  }
}
