import { ApiProperty } from "@nestjs/swagger";
import { NetworkIdentifier } from "./NetworkIdentifier";
import { Operation } from "./Operation";

export class ConstructionPreprocessRequest {
  @ApiProperty()
  network_identifier: NetworkIdentifier;
  
  @ApiProperty({ type: [Operation] })
  operations: Operation[];
  
  constructor(
    network_identifier: NetworkIdentifier,
    operations: Operation[]
  ) {
    this.network_identifier = network_identifier;
    this.operations = operations;
  }

  static validate(constructionDeriveRequest: ConstructionPreprocessRequest) {
    const networkValidationResult = NetworkIdentifier.validate(
      constructionDeriveRequest.network_identifier
    );

    return networkValidationResult;
  }
}
