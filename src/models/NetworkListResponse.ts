import { NetworkIdentifier } from "./NetworkIdentifier";

export class NetworkListResponse {
  constructor(public network_identifiers: NetworkIdentifier[]) {}
}