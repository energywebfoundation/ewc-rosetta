import { BlockIdentifier } from "./BlockIdentifier";
import { SyncStatus } from "./SyncStatus";
import { Peer } from "./Peer";
import { ApiProperty } from "@nestjs/swagger";

export class NetworkStatusResponse {
  @ApiProperty()
  current_block_identifier: BlockIdentifier;
  
  @ApiProperty()
  current_block_timestamp: number;
  
  @ApiProperty()
  genesis_block_identifier: BlockIdentifier;
  
  @ApiProperty({ type: [Peer] })
  peers: Peer[];

  @ApiProperty()
  oldest_block_identifier?: BlockIdentifier;
  
  @ApiProperty()
  sync_status?: SyncStatus;
  constructor(
    current_block_identifier: BlockIdentifier,
    current_block_timestamp: number,
    genesis_block_identifier: BlockIdentifier,
    peers: Peer[],
    oldest_block_identifier?: BlockIdentifier,
    sync_status?: SyncStatus
    ) {
      this.current_block_identifier = current_block_identifier;
      this.current_block_timestamp = current_block_timestamp;
      this.genesis_block_identifier = genesis_block_identifier;
      this.peers = peers;
      this.oldest_block_identifier = oldest_block_identifier;
      this.sync_status = sync_status;
    }
}
