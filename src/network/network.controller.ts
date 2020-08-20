import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
} from "@nestjs/common";

import { MetadataRequest } from "../models/MetadataRequest";
import { NetworkListResponse } from "../models/NetworkListResponse";
import { NetworkRequest } from "../models/NetworkRequest";
import { NetworkService } from "./network.service";

@Controller("network")
export class NetworkController {
  constructor(private networkService: NetworkService) {}

  @Post("list")
  @HttpCode(200)
  public async getList(@Body() body: MetadataRequest) {
    return new NetworkListResponse(this.networkService.networkIdentifiers);
  }

  @Post("options")
  @HttpCode(200)
  public async getOptions(@Body() body: NetworkRequest) {
    const validationResult = NetworkRequest.validate(body);
    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    return this.networkService.networkOptions;
  }

  @Post("status")
  @HttpCode(200)
  public async getStatus(@Body() body: NetworkRequest) {
    const validationResult = NetworkRequest.validate(body);
    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    return this.networkService.getNetworkStatus();
  }
}
