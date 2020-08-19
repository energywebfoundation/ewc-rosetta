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

  public networkIdentifiers: NetworkIdentifier[]
  public networkOptions: NetworkOptionsResponse

  constructor() {
    this.networkIdentifiers = [
      new NetworkIdentifier(
        'volta', '73799'
      ),
      new NetworkIdentifier(
        'ewc', '246'
      )
    ]
    const errors: Err[] = []
    for(const [k, v] of Object.entries(Errors)) {
      errors.push(v)
    }

    this.networkOptions = {
      "version": {
        "rosetta_version": "1.2.5",
        "node_version": "1.0.2",
        "middleware_version": "0.2.7",
        "metadata": {}
      },
      "allow": {
        "operation_statuses": [
          {
            "status": "SUCCESS",
            "successful": true
          }
        ],
        "operation_types": [
          "TRANSFER"
        ],
        "errors": errors,
        "historical_balance_lookup": true
      }
    }
  }

  public findNetwork(identifier) {
    return this.networkIdentifiers
      .find(ni =>
        ni.blockchain === identifier.blockchain && ni.network === identifier.network
      )
  }

  public async getNetworkStatus(network: NetworkIdentifier) : Promise<NetworkStatusResponse>{
    const currentBlock = await this.provider.getBlock("latest")
    const genesisBlock = await this.provider.getBlock(0)
    const networkStatus = new NetworkStatusResponse(
      new BlockIdentifier(currentBlock.number, currentBlock.hash),
      currentBlock.timestamp,
      new BlockIdentifier(genesisBlock.number, genesisBlock.hash),
      [] // getting peers seems to be a functionality of Web3 2.0 https://web3js.readthedocs.io/en/v2.0.0-alpha.1/web3-eth-admin.html#getpeers and is not available in ethers
    )
    return networkStatus
  }

}