import { TransactionIdentifier } from "./TransactionIdentifer";
import { NetworkIdentifier } from "./NetworkIdentifier";
import { PartialBlockIdentifier } from "./PartialBlockIdentifier";
import { BlockIdentifier } from "./BlockIdentifier";
import { ApiProperty } from "@nestjs/swagger";

export class BlockTransactionRequest {
  @ApiProperty()
  network_identifier: NetworkIdentifier;
  
  @ApiProperty()
  block_identifier: BlockIdentifier;
  
  @ApiProperty()
  transaction_identifier: TransactionIdentifier;
  constructor(
    network_identifier: NetworkIdentifier,
    block_identifier: BlockIdentifier,
    transaction_identifier: TransactionIdentifier
  ) {
    this.network_identifier = network_identifier;
    this.block_identifier = block_identifier;
    this.transaction_identifier = transaction_identifier;
  }

  static async validate(request: BlockTransactionRequest) {
    const networkValidationResult = NetworkIdentifier.validate(
      request.network_identifier
    );
    const blockValidationResult = await BlockIdentifier.validate(
      request.block_identifier
    );
    const transactionValidationResult = await TransactionIdentifier.validate(
      request.transaction_identifier
    );

    return (
      networkValidationResult ||
      blockValidationResult ||
      transactionValidationResult
    );
  }
}
