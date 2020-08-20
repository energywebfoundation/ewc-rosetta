import { NetworkIdentifier } from "./NetworkIdentifier";

export class ConstructionMetadataRequest {
  constructor(
    public network_identifier: NetworkIdentifier,
    public options: any
  ) {}

  static validate(constructionMetadataRequest: ConstructionMetadataRequest) {
    const networkValidationResult = NetworkIdentifier.validate(
      constructionMetadataRequest.network_identifier
    );

    return networkValidationResult;
  }
}
