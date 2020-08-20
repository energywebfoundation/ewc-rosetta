import { Injectable } from "@nestjs/common";
import { BigNumber, ethers } from "ethers";

import { Operation } from "../models/Operation";
import { OperationFactory } from "../models/OperationFactory";
import { getRPCProvider } from "../utils/client";
import { addZXPrefix } from "../utils/hex";

@Injectable()
export class ConstructionService {
  private provider = getRPCProvider();

  private signers = new Map<string, string>();

  public derive(bytes: string) {
    return ethers.utils.computeAddress(addZXPrefix(bytes));
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

    // workaround the fact that unsigned transaction does not provider from field
    // which is then required in the parse function in order to recover the from operation
    this.signers.set(transaction, sender);

    return {
      transaction,
      address: sender,
    };
  }

  public async parse(transaction: string, signed: boolean) {
    const { from, to, value } = ethers.utils.parseTransaction(transaction);

    // workaround
    const sender = this.signers.get(transaction);

    return {
      operations: new OperationFactory().transferEWT(from ?? sender, to, value),
      signer: from,
    };
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

    // for some reason when running from nest:start
    // v,r,s are set to 0x0 values instead undefined
    // which is causing serializeTransaction not taking the real signature
    delete parsedTransaction.v;
    delete parsedTransaction.r;
    delete parsedTransaction.s;

    return ethers.utils.serializeTransaction(parsedTransaction, signature);
  }
}
