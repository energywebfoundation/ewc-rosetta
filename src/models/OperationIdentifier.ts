import { ApiProperty } from "@nestjs/swagger"

export class OperationIdentifier {
  @ApiProperty()
  index: number
  constructor(index: number) {
    this.index = index
  }
}
