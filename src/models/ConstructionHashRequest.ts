import { NetworkIdentifier } from "./NetworkIdentifier";
import { ethers } from "ethers";
import { Errors } from "./Errors";

export class ConstructionHashRequest {
  constructor(
    public network_identifier: NetworkIdentifier,
    public signed_transaction: string
  ) {}

  static validate(constructionHashRequest: ConstructionHashRequest) {
    const networkValidationResult = NetworkIdentifier.validate(
      constructionHashRequest.network_identifier
    );

    let signedTransactionValidationResult = null;

    try {
      ethers.utils.parseTransaction(constructionHashRequest.signed_transaction);
    } catch (error) {
      signedTransactionValidationResult = Errors.INVALID_SIGNED_TX;
    }

    return networkValidationResult || signedTransactionValidationResult;
  }
}
