import { ApiProperty } from "@nestjs/swagger";
import { Account } from "./Account";
import { Amount } from "./Amount";
import { OperationIdentifier } from "./OperationIdentifier";

export class Operation {
  @ApiProperty()
  operation_identifier: OperationIdentifier;
  
  @ApiProperty()
  type: string;
  
  @ApiProperty()
  status: string;
  
  @ApiProperty()
  account: Account;
  
  @ApiProperty()
  amount?: Amount;
  
  @ApiProperty({ type: [OperationIdentifier]})
  related_operations?: OperationIdentifier[];
  constructor(
    operation_identifier: OperationIdentifier,
    type: string,
    status: string,
    account: Account,
    amount?: Amount,
    related_operations?: OperationIdentifier[]
  ) {
    this.operation_identifier = operation_identifier;
    this.type = type;
    this.status = status;
    this.account = account;
    this.amount = amount;
    this.related_operations = related_operations;
  }

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
