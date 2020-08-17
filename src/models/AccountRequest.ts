import { NetworkIdentifier } from "./NetworkIdentifier";
import { AccountIdentifier } from "./AccountIdentifier";
import { PartialBlockIdentifier } from "./PartialBlockIdentifier";

export class AccountRequest {
  constructor(
    public network_identifier: NetworkIdentifier,
    public account_identifier: AccountIdentifier,
    public block_identifier: PartialBlockIdentifier
  ) {}
}
