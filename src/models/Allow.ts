import { OperationStatus } from "./OperationStatus";
import { Error as Err } from "./Error";
import { ApiProperty } from "@nestjs/swagger";

export class Allow {
  @ApiProperty({ type: [OperationStatus] })
  operation_statuses: OperationStatus[]

  @ApiProperty({ type: [String] })
  operation_types: string[]
  
  @ApiProperty({ type: [Err] })
  errors: Err[]

  @ApiProperty()
  historical_balance_lookup: boolean
}
