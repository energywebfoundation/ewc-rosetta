import { SubAccountIdentifier } from "./SubAccountIdentifier";
import { Errors } from "./Errors";

export class AccountIdentifier {
  constructor(public address: string, public sub_account_identifier?: SubAccountIdentifier, metadata?: any) {}

  static validate(accountIdentifier: AccountIdentifier) {
    if (!accountIdentifier || !accountIdentifier.address) {
      return Errors.ADDRESS_REQUIRED;
    }
  }

}
