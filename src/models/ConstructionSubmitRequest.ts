import { NetworkIdentifier } from "./NetworkIdentifier";
import { ethers } from "ethers";
import { Errors } from "./Errors";

export class ConstructionSubmitRequest {
  constructor(
    public network_identifier: NetworkIdentifier,
    public signed_transaction: string
  ) {}

  static validate(constructionSubmitRequest: ConstructionSubmitRequest) {
    const networkValidationResult = NetworkIdentifier.validate(
      constructionSubmitRequest.network_identifier
    );

    let signedTransactionValidationResult = null;

    try {
      const parsedTransaction = ethers.utils.parseTransaction(
        constructionSubmitRequest.signed_transaction
      );
      if (!parsedTransaction.from) {
        throw new Error();
      }
    } catch (error) {
      signedTransactionValidationResult = Errors.INVALID_SIGNED_TX;
    }
    return networkValidationResult || signedTransactionValidationResult;
  }
}
