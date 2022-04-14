import { ApiProperty } from "@nestjs/swagger";
import { Transaction } from "./Transaction";

export class BlockTransactionResponse {
  @ApiProperty()
  transaction: Transaction
}
