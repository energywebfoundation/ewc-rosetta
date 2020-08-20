import { NetworkIdentifier } from "./NetworkIdentifier";
import { Errors } from "./Errors";
import { ethers } from "ethers";

export class ConstructionParseRequest {
  constructor(
    public network_identifier: NetworkIdentifier,
    public signed: boolean,
    public transaction: string
  ) {}

  static validate(constructionParseRequest: ConstructionParseRequest) {
    const networkValidationResult = NetworkIdentifier.validate(
      constructionParseRequest.network_identifier
    );

    let signedTransactionValidationResult = null;

    try {
      ethers.utils.parseTransaction(constructionParseRequest.transaction);
    } catch (error) {
      signedTransactionValidationResult = constructionParseRequest.signed
        ? Errors.INVALID_SIGNED_TX
        : Errors.INVALID_TX;
    }

    return networkValidationResult || signedTransactionValidationResult;
  }
}
