import { PartialBlockIdentifier } from "./PartialBlockIdentifier";
import { Transaction } from "./Transaction";

export class Block {
  constructor(
    public block_identifier: PartialBlockIdentifier,
    public parent_block_identifier: PartialBlockIdentifier,
    public timestamp: number,
    public transactions: Transaction[]
  ) {}
}
