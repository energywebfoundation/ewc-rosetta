import { ApiProperty } from "@nestjs/swagger"

export class SyncStatus {
  @ApiProperty()
  current_index: number
  
  @ApiProperty()
  target_index: number
  
  @ApiProperty()
  stage: string
}
