import { ApiProperty } from "@nestjs/swagger"

export class Account {
  @ApiProperty()
  address: string
  constructor(address: string) {
    this.address = address
  }
}
