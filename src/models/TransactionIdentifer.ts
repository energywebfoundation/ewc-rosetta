import { getRPCProvider } from "src/utils/client";
import { Errors } from "./Errors";

export class TransactionIdentifier {
  constructor(public hash: string) {}

  static async validate(transactionIdentifier: TransactionIdentifier) {
    if (transactionIdentifier?.hash) {
      const provider = getRPCProvider();
      const transaction = await provider.getTransaction(
        transactionIdentifier.hash
      );
      const block = await provider.getBlock(transactionIdentifier.hash);

      if (!transaction && !block) {
        return Errors.TX_NOT_FOUND;
      }
    }

    return null;
  }
}
