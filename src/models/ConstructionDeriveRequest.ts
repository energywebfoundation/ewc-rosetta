import { NetworkIdentifier } from "./NetworkIdentifier";
import { PublicKey } from "./PublicKey";

export class ConstructionDeriveRequest {
  constructor(
    public network_identifer: NetworkIdentifier,
    public public_key: PublicKey
  ) {}

  static validate(constructionDeriveRequest: ConstructionDeriveRequest) {
    const networkValidationResult = NetworkIdentifier.validate(
      constructionDeriveRequest.network_identifer
    );
    const publicKeyValidationResult = PublicKey.validate(
      constructionDeriveRequest.public_key
    );

    return networkValidationResult || publicKeyValidationResult;
  }
}
