import { Errors } from "./Errors";

export class NetworkIdentifier {
  constructor(public blockchain: string, public network: string) {}

  static validate(network: NetworkIdentifier) {
    if (!network) {
      return Errors.NETWORK_REQUIRED;
    }

    if (network.blockchain !== process.env.BLOCKCHAIN) {
      return Errors.INVALID_BLOCKCHAIN;
    }

    if (network.network !== process.env.NETWORK) {
      return Errors.INVALID_NETWORK;
    }
  }
}
