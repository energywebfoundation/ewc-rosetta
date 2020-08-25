import { TransactionIdentifier } from "./TransactionIdentifer";
import { NetworkIdentifier } from "./NetworkIdentifier";
import { PartialBlockIdentifier } from "./PartialBlockIdentifier";
import { BlockIdentifier } from "./BlockIdentifier";

export class BlockTransactionRequest {
  constructor(
    public network_identifier: NetworkIdentifier,
    public block_identifier: BlockIdentifier,
    public transaction_identifier: TransactionIdentifier
  ) {}

  static async validate(request: BlockTransactionRequest) {
    const networkValidationResult = NetworkIdentifier.validate(
      request.network_identifier
    );
    const blockValidationResult = await BlockIdentifier.validate(
      request.block_identifier
    );
    const transactionValidationResult = await TransactionIdentifier.validate(
      request.transaction_identifier
    );

    return (
      networkValidationResult ||
      blockValidationResult ||
      transactionValidationResult
    );
  }
}
