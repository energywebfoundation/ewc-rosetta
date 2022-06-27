import { Operation } from './Operation'
import { Amount } from './Amount'
import { BigNumber } from 'ethers'
import { Currency } from './Currency'
import { OperationIdentifier } from './OperationIdentifier'
import { Account } from './Account'

export class OperationFactory {
  private operationIndex = 0

  public Transfer(address: string, amount: Amount, success: boolean) {
    return Operation.Transfer(this.operationIndex++, address, amount, success)
  }

  public transferEWT(
    from: string,
    to: string | null,
    value: BigNumber,
    success?: boolean
  ) {
    const ops = [
      Operation.Transfer(
        this.operationIndex++,
        from,
        new Amount(value.mul(-1).toString(), Currency.EWT),
        success
      )
    ]
    if (to) {
      ops.push(Operation.Transfer(
        this.operationIndex++,
        to,
        new Amount(value.toString(), Currency.EWT),
        success,
        [new OperationIdentifier(this.operationIndex - 2)]
      ))
    }
    return ops;
  }

  public fee({ from, miner, value }: { from: string, miner?: string, value: BigNumber }) {
    const ops = [
      new Operation(
        new OperationIdentifier(this.operationIndex++),
        'Fee',
        'Success',
        new Account(from),
        new Amount(value.mul(-1).toString(), Currency.EWT)
      ),
    ]
    if (miner) {
      ops.push(
        new Operation(
          new OperationIdentifier(this.operationIndex++),
          'Fee',
          'Success',
          new Account(miner),
          new Amount(value.toString(), Currency.EWT),
          [new OperationIdentifier(this.operationIndex - 2)]
        )
      )
    }
    return ops
  }

  public reward(address: string, value: BigNumber) {
    return [
      new Operation(
        new OperationIdentifier(this.operationIndex++),
        'Reward',
        'Success',
        new Account(process.env.REWARD_CONTRACT_ADDRESS)
      ),
      new Operation(
        new OperationIdentifier(this.operationIndex++),
        'Reward',
        'Success',
        new Account(address),
        new Amount(value.toString(), Currency.EWT),
        [new OperationIdentifier(this.operationIndex - 2)]
      ),
    ]
  }
}
