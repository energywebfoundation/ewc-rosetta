import { Operation } from "./Operation";
import { Amount } from "./Amount";
import { BigNumber } from "ethers";
import { Currency } from "./Currency";
import { OperationIdentifier } from "./OperationIdentifier";
import { Account } from "./Accounts";

export class OperationFactory {
  private operationIndex = 0;

  public Transfer(address: string, amount: Amount, success: boolean) {
    return Operation.Transfer(this.operationIndex++, address, amount, success);
  }

  public transferEWT(
    from: string,
    to: string,
    value: BigNumber,
    success: boolean
  ) {
    return [
      this.Transfer(
        from,
        new Amount(value.mul(-1).toString(), Currency.EWT),
        success
      ),
      this.Transfer(to, new Amount(value.toString(), Currency.EWT), success),
    ];
  }

  public fee(from: string, miner: string, value: BigNumber) {
    return [
      new Operation(
        new OperationIdentifier(this.operationIndex++),
        "Fee",
        "Success",
        new Account(from),
        new Amount(value.mul(-1).toString(), Currency.EWT)
      ),
      new Operation(
        new OperationIdentifier(this.operationIndex++),
        "Fee",
        "Success",
        new Account(miner),
        new Amount(value.toString(), Currency.EWT)
      ),
    ];
  }

  public reward(address: string, value: BigNumber) {
    const operation = this.operationIndex++;

    return [
      new Operation(
        new OperationIdentifier(operation),
        "Reward",
        "Success",
        new Account(process.env.REWARD_CONTRACT_ADDRESS)
      ),
      new Operation(
        new OperationIdentifier(this.operationIndex++),
        "Reward",
        "Success",
        new Account(address),
        new Amount(value.toString(), Currency.EWT),
        [new OperationIdentifier(operation)]
      ),
    ];
  }
}
