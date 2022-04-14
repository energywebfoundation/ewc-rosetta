import { ApiProperty } from "@nestjs/swagger";
import { TransactionIdentifier } from "./TransactionIdentifer";

export class ConstructionSubmitResponse {
  @ApiProperty()
  transaction_identifier: TransactionIdentifier
}
