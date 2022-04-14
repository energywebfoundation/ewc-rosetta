import { ApiProperty } from "@nestjs/swagger";

export class Currency {
  @ApiProperty()
  symbol: string;
  
  @ApiProperty()
  decimals: number
  
  constructor(symbol: string, decimals: number) {
    this.symbol = symbol;
    this.decimals = decimals;
  }

  static get EWT() {
    return new Currency("EWT", 18);
  }
}
