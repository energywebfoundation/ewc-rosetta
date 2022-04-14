import { ApiProperty } from "@nestjs/swagger";
import { NetworkIdentifier } from "./NetworkIdentifier";
import { PublicKey } from "./PublicKey";

export class ConstructionDeriveRequest {
  @ApiProperty()
  network_identifier: NetworkIdentifier;
  
  @ApiProperty()
  public_key: PublicKey;
  
  constructor(
    network_identifier: NetworkIdentifier,
    public_key: PublicKey
  ) {
    this.network_identifier = network_identifier;
    this.public_key = public_key;
  }

  static validate(constructionDeriveRequest: ConstructionDeriveRequest) {
    const networkValidationResult = NetworkIdentifier.validate(
      constructionDeriveRequest.network_identifier
    );
    const publicKeyValidationResult = PublicKey.validate(
      constructionDeriveRequest.public_key
    );

    return networkValidationResult || publicKeyValidationResult;
  }
}
