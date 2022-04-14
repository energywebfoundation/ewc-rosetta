import { ApiProperty } from "@nestjs/swagger";
import { Currency } from "./Currency";
import { PartialBlockIdentifier } from "./PartialBlockIdentifier";

class Balance {
  @ApiProperty()
  value: string;

  @ApiProperty()
  currency: Currency;
}

export class AccountResponse {
  @ApiProperty()
  block_identifier: PartialBlockIdentifier
  
  @ApiProperty({ type: [Balance] })
  balances: Balance[]
}
