import { NetworkIdentifier } from "./NetworkIdentifier";
import { ethers } from "ethers";
import { Errors } from "./Errors";
import { ApiProperty } from "@nestjs/swagger";

export class ConstructionSubmitRequest {
  @ApiProperty()
  network_identifier: NetworkIdentifier;
  
  @ApiProperty()
  signed_transaction: string;
  
  constructor(
    network_identifier: NetworkIdentifier,
    signed_transaction: string
  ) {
    this.network_identifier = network_identifier;
    this.signed_transaction = signed_transaction;
  }

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
