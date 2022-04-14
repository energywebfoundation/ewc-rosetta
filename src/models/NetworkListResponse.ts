import { ApiProperty } from "@nestjs/swagger";
import { NetworkIdentifier } from "./NetworkIdentifier";

export class NetworkListResponse {
  @ApiProperty({ type: [NetworkIdentifier] })
  network_identifiers: NetworkIdentifier[]
  
  constructor(network_identifiers: NetworkIdentifier[]) {
    this.network_identifiers = network_identifiers;
  }
}
