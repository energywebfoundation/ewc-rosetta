import { Injectable } from "@nestjs/common";
import { ethers, BigNumber } from "ethers";
import { Operation } from "../models/Operation";
import { getRPCProvider } from "../utils/client";
import { OperationFactory } from "../models/OperationFactory";
import { sign } from "crypto";
import { Amount } from "../models/Amount";
import { Currency } from "../models/Currency";
import { Errors } from "../models/Errors";

@Injectable()
export class ConstructionService {
  private provider = getRPCProvider();

  public derive(bytes: string) {
    return ethers.utils.computeAddress(bytes);
  }

  public hash(signedTransaction: string) {
    const transaction = ethers.utils.parseTransaction(signedTransaction);

    return transaction.hash;
  }

  public async payloads(operations: Operation[]) {
    const [from, to] = operations.sort(
      (a, b) => a.operation_identifier.index - b.operation_identifier.index
    );

    const sender = from.account.address;
    const receiver = to.account.address;
    const value = BigNumber.from(to.amount.value);

    const transaction = ethers.utils.serializeTransaction({
      to: receiver,
      nonce: await this.provider.getTransactionCount(sender),
      gasLimit: 21000,
      gasPrice: await this.provider.getGasPrice(),
      value,
      chainId: (await this.provider.getNetwork()).chainId,
    });

    return {
      transaction,
      address: sender,
    };
  }

  public async parse(transaction: string, signed: boolean) {
    const { from, to, value } = ethers.utils.parseTransaction(transaction);

    if (signed) {
      return {
        operations: new OperationFactory().transferEWT(from, to, value, true),
        signer: from,
      };
    } else {
      return {
        operations: [
          Operation.Transfer(
            0,
            to,
            new Amount(value.toString(), Currency.EWT),
            true
          ),
        ],
        signer: null,
      };
    }
  }

  public async submit(signedTransaction: string) {
    const response = await this.provider.sendTransaction(signedTransaction);
    await response.wait();

    return response.hash;
  }

  public async combine(unsignedTransaction: string, signature: string) {
    const parsedTransaction = ethers.utils.parseTransaction(
      unsignedTransaction
    );

    return ethers.utils.serializeTransaction(parsedTransaction, signature);
  }
}
