import { NetworkIdentifier } from "./NetworkIdentifier";

export class NetworkRequest {
  constructor(public network_identifier: NetworkIdentifier, metadata?: any) {}

  static validate(networkRequest: NetworkRequest) {
    return NetworkIdentifier.validate(networkRequest.network_identifier);
  }
}
