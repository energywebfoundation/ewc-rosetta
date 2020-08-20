import { NetworkIdentifier } from "./NetworkIdentifier";
import { Operation } from "./Operation";

export class ConstructionPayloadsRequest {
  constructor(
    public network_identifier: NetworkIdentifier,
    public operations: Operation[],
    public metadata?: any
  ) {}

  static validate(constructionPayloadsRequest: ConstructionPayloadsRequest) {
    const networkValidationResult = NetworkIdentifier.validate(
      constructionPayloadsRequest.network_identifier
    );

    return networkValidationResult;
  }
}
