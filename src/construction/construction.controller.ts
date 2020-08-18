import { Body, Controller, HttpException, Post } from "@nestjs/common";
import { ConstructionDeriveRequest } from "../models/ConstructionDeriveRequest";

import { ConstructionService } from "./construction.service";

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
}
