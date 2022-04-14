import { ApiProperty } from "@nestjs/swagger"

export class Peer {
  @ApiProperty()
  peer_id: string
  
  @ApiProperty()
  metadata?: any
}
