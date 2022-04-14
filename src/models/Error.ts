import { ApiProperty } from "@nestjs/swagger"

export class Error {
  @ApiProperty()
  code: number

  @ApiProperty()
  message: string

  @ApiProperty()
  description?: string
  
  @ApiProperty()
  retriable: boolean
  
  @ApiProperty()
  details?: any
}
