import { Body, Controller, Post } from "@nestjs/common";
import { NetworkIdentifier } from "../models/NetworkIdentifier";
import { MetadataRequest } from "../models/MetadataRequest";

@Controller("network")
export class NetworkController {
  @Post("list")
  public async getList(@Body() body: MetadataRequest) {
    return {
      network_identifiers: [
        new NetworkIdentifier(
          'volta', '73799'
        ),
        new NetworkIdentifier(
          'energy web chain', '246'
        )
      ],
    };
  }
}
