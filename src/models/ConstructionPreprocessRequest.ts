import { NetworkIdentifier } from "./NetworkIdentifier";
import { Operation } from "./Operation";
import { Errors } from "./Errors";

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
