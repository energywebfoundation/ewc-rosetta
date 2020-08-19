import { TransactionIdentifier } from "./TransactionIdentifer";
import { NetworkIdentifier } from "./NetworkIdentifier";
import { PartialBlockIdentifier } from "./PartialBlockIdentifier";

export class BlockTransactionRequest {
  constructor(
    public network_identifier: NetworkIdentifier,
    public block_identifier: PartialBlockIdentifier,
    public transaction_identifier: TransactionIdentifier
  ) {}
}
