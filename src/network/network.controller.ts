import { Body, Controller, Post } from "@nestjs/common";

import { Errors } from "../models/Errors";
import { MetadataRequest } from "../models/MetadataRequest";
import { NetworkIdentifier } from "../models/NetworkIdentifier";
import { NetworkListResponse } from "../models/NetworkListResponse";
import { NetworkRequest } from "../models/NetworkRequest";
import { NetworkService } from "./network.service";

@Controller("network")
export class NetworkController {
  constructor(private networkService: NetworkService) {}

  @Post("list")
  public async getList(@Body() body: MetadataRequest) {
    return new NetworkListResponse(this.networkService.networkIdentifiers);
  }

  @Post("options")
  public async getOptions(@Body() body: NetworkRequest) {
    const network = this.networkService.findNetwork(body.network_identifier);
    if (!network) {
      return Errors.INVALID_NETWORK;
    }

    return (
      NetworkIdentifier.validate(network) || this.networkService.networkOptions
    );
  }

  @Post("status")
  public async getStatus(@Body() body: NetworkRequest) {
    const network = this.networkService.findNetwork(body.network_identifier);
    if (!network) {
      return Errors.INVALID_NETWORK;
    }

    return (
      NetworkIdentifier.validate(network) ||
      this.networkService.getNetworkStatus(network)
    );
  }
}
