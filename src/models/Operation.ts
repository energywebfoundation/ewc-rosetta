import { OperationIdentifier } from "./OperationIdentifier";
import { Account } from "./Accounts";
import { Amount } from "./Amount";
import { Currency } from "./Currency";
import { BigNumber } from "ethers";

export class Operation {
  constructor(
    public opertation_identifier: OperationIdentifier,
    public type: string,
    public status: string,
    public account: Account,
    public amount: Amount
  ) {}

  static Transfer(
    index: number,
    address: string,
    amount: Amount,
    success: boolean
  ) {
    return new Operation(
      new OperationIdentifier(index),
      "Transfer",
      success ? "success" : "reverted",
      new Account(address),
      amount
    );
  }

  static TransferEWT(
    index: number,
    address: string,
    value: BigNumber,
    success: boolean
  ) {
    return this.Transfer(
      index,
      address,
      new Amount(value.toString(), Currency.EWT),
      success
    );
  }

  static Fee(index: number, address: string, value: BigNumber) {
    return new Operation(
      new OperationIdentifier(index),
      "Fee",
      "Success",
      new Account(address),
      new Amount(value.toString(), Currency.EWT)
    );
  }
}
