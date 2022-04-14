import { ApiProperty } from "@nestjs/swagger";
import { NetworkIdentifier } from "./NetworkIdentifier";

export class NetworkRequest {
  @ApiProperty()
  network_identifier: NetworkIdentifier;
  
  @ApiProperty()
  metadata?: any;
  
  constructor(network_identifier: NetworkIdentifier, metadata?: any) {
    this.network_identifier = network_identifier;
    this.metadata = metadata;
  }

  static validate(networkRequest: NetworkRequest) {
    return NetworkIdentifier.validate(networkRequest.network_identifier);
  }
}
