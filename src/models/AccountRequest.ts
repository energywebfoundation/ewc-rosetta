import { NetworkIdentifier } from "./NetworkIdentifier";
import { AccountIdentifier } from "./AccountIdentifier";
import { PartialBlockIdentifier } from "./PartialBlockIdentifier";

export class AccountRequest {
  constructor(
    public network_identifier: NetworkIdentifier,
    public account_identifier: AccountIdentifier,
    public block_identifier: PartialBlockIdentifier
  ) {}

  static async validate(request: AccountRequest) {
    const networkValidationResult = NetworkIdentifier.validate(
      request.network_identifier
    );
    const accountValidationResult = AccountIdentifier.validate(
      request.account_identifier
    );
    const blockValidationResult = await PartialBlockIdentifier.validate(
      request.block_identifier
    );

    return networkValidationResult || accountValidationResult || blockValidationResult;
  }
  
}
