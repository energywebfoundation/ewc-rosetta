import { NetworkIdentifier } from "./NetworkIdentifier";
import { ethers } from "ethers";
import { Errors } from "./Errors";
import { ApiProperty } from "@nestjs/swagger";

export class ConstructionHashRequest {
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
