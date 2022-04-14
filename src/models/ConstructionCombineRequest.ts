import { NetworkIdentifier } from "./NetworkIdentifier";
import { Signature } from "./Signature";
import { ethers } from "ethers";
import { Errors } from "./Errors";
import { ApiProperty } from "@nestjs/swagger";

export class ConstructionCombineRequest {
  @ApiProperty()
  network_identifier: NetworkIdentifier;
  
  @ApiProperty()
  unsigned_transaction: string;
  
  @ApiProperty({ type: [Signature] })
  signatures: Signature[];
  
  constructor(
    network_identifier: NetworkIdentifier,
    unsigned_transaction: string,
    signatures: Signature[]
  ) {
    this.network_identifier = network_identifier;
    this.unsigned_transaction = unsigned_transaction;
    this.signatures = signatures;
  }

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
