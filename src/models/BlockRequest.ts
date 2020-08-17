import { NetworkIdentifier } from "./NetworkIdentifier";
import { PartialBlockIdentifier } from "./PartialBlockIdentifier";

export class BlockRequest {
  constructor(
    public network_identifier: NetworkIdentifier,
    public block_identifier: PartialBlockIdentifier
  ) {}

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
