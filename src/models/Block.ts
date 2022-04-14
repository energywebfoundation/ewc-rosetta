import { ApiProperty } from "@nestjs/swagger";
import { PartialBlockIdentifier } from "./PartialBlockIdentifier";
import { Transaction } from "./Transaction";

export class Block {
  @ApiProperty()
  block_identifier: PartialBlockIdentifier;
  
  @ApiProperty()
  parent_block_identifier: PartialBlockIdentifier;
  
  @ApiProperty()
  timestamp: number;
  
  @ApiProperty({ type: [Transaction]})
  transactions: Transaction[];

  constructor(
    block_identifier: PartialBlockIdentifier,
    parent_block_identifier: PartialBlockIdentifier,
    timestamp: number,
    transactions: Transaction[]
  ) {
    this.block_identifier = block_identifier;
    this.parent_block_identifier = parent_block_identifier;
    this.timestamp = timestamp;
    this.transactions = transactions;
  }
}
