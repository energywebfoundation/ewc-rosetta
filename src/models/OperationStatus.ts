import { ApiProperty } from "@nestjs/swagger"

export class OperationStatus {
  @ApiProperty()
  status: string
  
  @ApiProperty()
  successful: boolean
}
