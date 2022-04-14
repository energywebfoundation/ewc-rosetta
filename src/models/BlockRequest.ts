import { ApiProperty } from "@nestjs/swagger";
import { NetworkIdentifier } from "./NetworkIdentifier";
import { PartialBlockIdentifier } from "./PartialBlockIdentifier";

export class BlockRequest {
  @ApiProperty()
  network_identifier: NetworkIdentifier;
  
  @ApiProperty()
  block_identifier: PartialBlockIdentifier;
  constructor(
    network_identifier: NetworkIdentifier,
    block_identifier: PartialBlockIdentifier
  ) {
    this.network_identifier = network_identifier;
    this.block_identifier =block_identifier;
  }

  static async validate(request: BlockRequest) {
    const networkValidationResult = NetworkIdentifier.validate(
      request.network_identifier
    );
    const blockValidationResult = await PartialBlockIdentifier.validate(
      request.block_identifier
    );

    return networkValidationResult || blockValidationResult;
  }
}
