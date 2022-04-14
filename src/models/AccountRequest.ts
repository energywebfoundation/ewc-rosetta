import { NetworkIdentifier } from "./NetworkIdentifier";
import { AccountIdentifier } from "./AccountIdentifier";
import { PartialBlockIdentifier } from "./PartialBlockIdentifier";
import { ApiProperty } from "@nestjs/swagger";

export class AccountRequest {
  @ApiProperty()
  public network_identifier: NetworkIdentifier;
  
  @ApiProperty()
  public account_identifier: AccountIdentifier;
  
  @ApiProperty()
  public block_identifier: PartialBlockIdentifier;
  
  constructor(
    network_identifier: NetworkIdentifier,
    account_identifier: AccountIdentifier,
    block_identifier: PartialBlockIdentifier
  ) {
    this.account_identifier = account_identifier;
    this.network_identifier = network_identifier;
    this.block_identifier = block_identifier;
  }

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
