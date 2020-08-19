import { NetworkIdentifier } from "./NetworkIdentifier";
import { TransactionIdentifier } from "./TransactionIdentifer";

export class MempoolRequest {
  constructor(
    public network_identifier: NetworkIdentifier,
    public transaction_identifier: TransactionIdentifier
  ) {}

  static async validate(request: MempoolRequest) {
    const networkValidationResult = NetworkIdentifier.validate(
      request.network_identifier
    );
    const transactionValidationResult = await TransactionIdentifier.validate(
      request.transaction_identifier
    );

    return networkValidationResult || transactionValidationResult;
  }
}
