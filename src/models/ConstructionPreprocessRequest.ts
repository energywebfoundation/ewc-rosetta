import { NetworkIdentifier } from "./NetworkIdentifier";
import { Operation } from "./Operation";

export class ConstructionPreprocessRequest {
  constructor(
    public network_identifier: NetworkIdentifier,
    public operations: Operation[]
  ) {}

  static validate(constructionDeriveRequest: ConstructionPreprocessRequest) {
    const networkValidationResult = NetworkIdentifier.validate(
      constructionDeriveRequest.network_identifier
    );

    return networkValidationResult;
  }
}
