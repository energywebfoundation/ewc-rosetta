import { SubAccountIdentifier } from "./SubAccountIdentifier";

export class AccountIdentifier {
  constructor(public address: string, public sub_account_identifier: SubAccountIdentifier, metadata: any) {}
}
