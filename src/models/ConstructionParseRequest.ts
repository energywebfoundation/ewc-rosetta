import { NetworkIdentifier } from "./NetworkIdentifier";
import { Errors } from "./Errors";
import { ethers } from "ethers";
import { ApiProperty } from "@nestjs/swagger";

export class ConstructionParseRequest {
  @ApiProperty()
  network_identifier: NetworkIdentifier;
  
  @ApiProperty()
  signed: boolean;

  @ApiProperty()
  transaction: string;
  
  constructor(
    network_identifier: NetworkIdentifier,
    signed: boolean,
    transaction: string
  ) {
    this.network_identifier = network_identifier;
    this.signed = signed;
    this.transaction = transaction;
  }

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
