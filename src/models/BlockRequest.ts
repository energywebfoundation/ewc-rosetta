import { NetworkIdentifier } from "./NetworkIdentifier";
import { PartialBlockIdentifier } from "./PartialBlockIdentifier";

export class BlockRequest {
  constructor(
    public network_identifier: NetworkIdentifier,
    public block_identifier: PartialBlockIdentifier
  ) {}
}
