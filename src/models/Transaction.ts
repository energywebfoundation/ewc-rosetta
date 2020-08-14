import { TransactionIdentifier } from "./TransactionIdentifer";
import { Operation } from "./Operation";

export class Transaction {
  constructor(
    public transaction_identifier: TransactionIdentifier,
    public operations: Operation[]
  ) {}
}
