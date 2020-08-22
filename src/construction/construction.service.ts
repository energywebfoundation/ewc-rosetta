import { Injectable } from "@nestjs/common";
import { BigNumber, ethers } from "ethers";

import { Operation } from "../models/Operation";
import { OperationFactory } from "../models/OperationFactory";
import { getRPCProvider } from "../utils/client";
import { addZXPrefix } from "../utils/hex";
import { TransactionMetadata } from "../models/TransactionMetadata";

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

  public async payloads(
    operations: Operation[],
    metadata: TransactionMetadata
  ) {
    const { from, to } = this.parseOperations(operations);

    const sender = from.account.address;
    const receiver = to.account.address;
    const value = BigNumber.from(to.amount.value);

    const { nonce, gasPrice, chainId } = metadata;

    const transaction = ethers.utils.serializeTransaction({
      to: receiver,
      nonce,
      gasLimit: 21000,
      gasPrice: BigNumber.from(gasPrice),
      value,
      chainId,
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

  public preprocess(operations: Operation[]) {
    const { from } = this.parseOperations(operations);

    return from.account.address;
  }

  public async metadata(signer: string) {
    const nonce = await this.provider.getTransactionCount(signer);
    const gasPrice = (await this.provider.getGasPrice()).toString();
    const chainId = (await this.provider.getNetwork()).chainId;

    return new TransactionMetadata(nonce, gasPrice, chainId);
  }

  private parseOperations(operations: Operation[]) {
    const [from, to] = operations.sort(
      (a, b) => a.operation_identifier.index - b.operation_identifier.index
    );

    return { from, to };
  }
}
