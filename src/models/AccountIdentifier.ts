import { SubAccountIdentifier } from "./SubAccountIdentifier";
import { Errors } from "./Errors";
import { ApiProperty } from "@nestjs/swagger";

export class AccountIdentifier {
  @ApiProperty()
  address: string;
  
  @ApiProperty()
  sub_account_identifier?: SubAccountIdentifier;
  
  @ApiProperty()
  metadata?: any
  
  constructor(address: string, sub_account_identifier?: SubAccountIdentifier, metadata?: any) {
    this.address = address;
    this.sub_account_identifier = sub_account_identifier;
    this.metadata = metadata;
  }

  static validate(accountIdentifier: AccountIdentifier) {
    if (!accountIdentifier || !accountIdentifier.address) {
      return Errors.ADDRESS_REQUIRED;
    }
  }

}
