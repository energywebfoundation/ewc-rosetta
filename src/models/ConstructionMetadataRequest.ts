import { NetworkIdentifier } from "./NetworkIdentifier";
import { ethers } from "ethers";
import { Errors } from "./Errors";

export class ConstructionMetadataRequest {
  constructor(
    public network_identifier: NetworkIdentifier,
    public options: any
  ) {}

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
