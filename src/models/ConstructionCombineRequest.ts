import { NetworkIdentifier } from "./NetworkIdentifier";
import { Signature } from "./Signature";
import { ethers } from "ethers";
import { Errors } from "./Errors";

export class ConstructionCombineRequest {
  constructor(
    public network_identifier: NetworkIdentifier,
    public unsigned_transaction: string,
    public signatures: Signature[]
  ) {}

  static validate(constructionCombineRequest: ConstructionCombineRequest) {
    const networkValidationResult = NetworkIdentifier.validate(
      constructionCombineRequest.network_identifier
    );

    let unsignedTransactionValidationResult = null;

    try {
      ethers.utils.parseTransaction(
        constructionCombineRequest.unsigned_transaction
      );
    } catch (error) {
      unsignedTransactionValidationResult = Errors.INVALID_TX;
    }

    return networkValidationResult || unsignedTransactionValidationResult;
  }
}
