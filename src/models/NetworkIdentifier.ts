import { ApiProperty } from "@nestjs/swagger";
import { Errors } from "./Errors";

export class NetworkIdentifier {
  @ApiProperty()
  public blockchain: string; 
  
  @ApiProperty()
  public network: string;
  
  constructor(blockchain: string, network: string) {
    this.blockchain = blockchain;
    this.network = network;
  }

  static validate(network: NetworkIdentifier) {
    if (!network) {
      return Errors.NETWORK_REQUIRED;
    }

    if (network.blockchain !== process.env.BLOCKCHAIN) {
      return Errors.INVALID_BLOCKCHAIN;
    }

    if (network.network !== process.env.NETWORK) {
      return Errors.INVALID_NETWORK;
    }
  }
}
