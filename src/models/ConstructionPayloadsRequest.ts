import { ApiProperty } from "@nestjs/swagger";
import { NetworkIdentifier } from "./NetworkIdentifier";
import { Operation } from "./Operation";

export class ConstructionPayloadsRequest {
  @ApiProperty()
  network_identifier: NetworkIdentifier;
  
  @ApiProperty({ type: [Operation] })
  operations: Operation[];

  @ApiProperty()
  metadata?: any;
  
  constructor(
    network_identifier: NetworkIdentifier,
    operations: Operation[],
    metadata?: any
  ) {
    this.network_identifier = network_identifier;
    this.operations = operations;
    this.metadata = metadata;
  }

  static validate(constructionPayloadsRequest: ConstructionPayloadsRequest) {
    const networkValidationResult = NetworkIdentifier.validate(
      constructionPayloadsRequest.network_identifier
    );

    return networkValidationResult;
  }
}
