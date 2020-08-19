import { BlockIdentifier } from "./BlockIdentifier";
import { SyncStatus } from "./SyncStatus";
import { Peer } from "./Peer";

export class NetworkStatusResponse {
  constructor(
    public current_block_identifier: BlockIdentifier,
    public current_block_timestamp: number,
    public genesis_block_identifier: BlockIdentifier,
    public peers: Peer[],
    public oldest_block_identifier?: BlockIdentifier,
    public sync_status?: SyncStatus) {}
}