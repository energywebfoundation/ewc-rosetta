import { TransactionIdentifier } from "./TransactionIdentifer";
import { Operation } from "./Operation";
import { ApiProperty } from "@nestjs/swagger";

export class Transaction {
  @ApiProperty()
  transaction_identifier: TransactionIdentifier;
  
  @ApiProperty({ type: [Operation]})
  operations: Operation[];

  constructor(
    transaction_identifier: TransactionIdentifier,
    operations: Operation[]
  ) {
    this.transaction_identifier = transaction_identifier;
    this.operations = operations;
  }
}
