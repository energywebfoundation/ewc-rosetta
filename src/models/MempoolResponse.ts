import { ApiProperty } from "@nestjs/swagger";
import { Transaction } from "./Transaction";
import { TransactionIdentifier } from "./TransactionIdentifer";

export class MempoolResponse {
  @ApiProperty({ type: [TransactionIdentifier] })
  transaction_identifiers: TransactionIdentifier[]
}

export class MempoolTransactionResponse {
  @ApiProperty()
  transaction: Transaction
}
