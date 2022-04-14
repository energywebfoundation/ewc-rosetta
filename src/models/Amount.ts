import { ApiProperty } from '@nestjs/swagger'
import { Currency } from './Currency'

export class Amount {
  @ApiProperty()
  value: string;

  @ApiProperty()
  currency: Currency;

  constructor(value: string, currency: Currency) {
    this.currency = currency;
    this.value = value;
  }
}
