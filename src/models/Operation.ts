import { Account } from "./Account";
import { Amount } from "./Amount";
import { OperationIdentifier } from "./OperationIdentifier";

export class Operation {
  constructor(
    public operation_identifier: OperationIdentifier,
    public type: string,
    public status: string,
    public account: Account,
    public amount?: Amount,
    public related_operations?: OperationIdentifier[]
  ) {}

  static Transfer(
    index: number,
    address: string,
    amount: Amount,
    success?: boolean,
    relatedOperations?: OperationIdentifier[]
  ) {
    return new Operation(
      new OperationIdentifier(index),
      "Transfer",
      success === undefined ? "" : success ? "Success" : "Reverted",
      new Account(address),
      amount,
      relatedOperations
    );
  }
}
