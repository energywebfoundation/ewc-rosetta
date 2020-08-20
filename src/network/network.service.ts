import { Injectable } from "@nestjs/common";
import { NetworkIdentifier } from "../models/NetworkIdentifier";
import { Error as Err } from "../models/Error";
import { Errors } from "../models/Errors";
import { NetworkOptionsResponse } from "../models/NetworkOptionsResponse";
import { NetworkStatusResponse } from "../models/NetworkStatusResponse";
import { getRPCProvider } from "../utils/client";
import { BlockIdentifier } from "../models/BlockIdentifier";

@Injectable()
export class NetworkService {
  private provider = getRPCProvider();

  public networkIdentifiers = [
    new NetworkIdentifier(process.env.BLOCKCHAIN, process.env.NETWORK),
  ];
  public networkOptions: NetworkOptionsResponse;

  constructor() {
    const errors: Err[] = [];
    for (const [, v] of Object.entries(Errors)) {
      errors.push(v);
    }

    this.networkOptions = {
      version: {
        rosetta_version: "1.4.2",
        node_version: "1.0.2",
      },
      allow: {
        operation_statuses: [
          {
            status: "Success",
            successful: true,
          },
          {
            status: "Reverted",
            successful: false,
          },
        ],
        operation_types: ["Transfer", "Fee", "Reward"],
        errors: errors,
        historical_balance_lookup: true,
      },
    };
  }

  public findNetwork(identifier) {
    return this.networkIdentifiers.find(
      (ni) =>
        ni.blockchain === identifier.blockchain &&
        ni.network === identifier.network
    );
  }

  public async getNetworkStatus(): Promise<NetworkStatusResponse> {
    const currentBlock = await this.provider.getBlock("latest");
    const genesisBlock = await this.provider.getBlock(0);
    const networkStatus = new NetworkStatusResponse(
      new BlockIdentifier(currentBlock.number, currentBlock.hash),
      currentBlock.timestamp * 1000,
      new BlockIdentifier(genesisBlock.number, genesisBlock.hash),
      [] // getting peers seems to be a functionality of Web3 2.0 https://web3js.readthedocs.io/en/v2.0.0-alpha.1/web3-eth-admin.html#getpeers and is not available in ethers
    );
    return networkStatus;
  }
}
