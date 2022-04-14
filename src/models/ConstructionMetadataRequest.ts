import { NetworkIdentifier } from "./NetworkIdentifier";
import { ethers } from "ethers";
import { Errors } from "./Errors";
import { ApiProperty } from "@nestjs/swagger";

export class ConstructionMetadataRequest {
  @ApiProperty()
  network_identifier: NetworkIdentifier;
  
  @ApiProperty()
  options: any;
  
  constructor(
    network_identifier: NetworkIdentifier,
    options: any
  ) {
    this.network_identifier = network_identifier;
    this.options = options
  }

  static validate(constructionMetadataRequest: ConstructionMetadataRequest) {
    const networkValidationResult = NetworkIdentifier.validate(
      constructionMetadataRequest.network_identifier
    );

    let signerValidationResult = null;
    try {
      ethers.utils.isAddress(constructionMetadataRequest.options.signer);
    } catch (e) {
      signerValidationResult = {
        ...Errors.ADDRESS_REQUIRED,
        details: "options.signer has to be correct address",
      };
    }

    return networkValidationResult || signerValidationResult;
  }
}
