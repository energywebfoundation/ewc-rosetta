import { ApiProperty } from "@nestjs/swagger";
import { TransactionIdentifier } from "./TransactionIdentifer";

export class ConstructionHashResponse {
  @ApiProperty()
  transaction_identifier: TransactionIdentifier
}
