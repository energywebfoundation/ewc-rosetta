import { Injectable } from "@nestjs/common";
import { BigNumber, ethers } from "ethers";

import { getRPCProvider } from "../utils/client";

@Injectable()
export class RewardService {
  private communityFundReward = BigNumber.from("600900558100000000");
  private communityFundAddress = "0x1204700000000000000000000000000000000003";
  private communityFundAddressStorageLocation = 11;

  private rewardContractABI = [
    "function payoutAddresses(address _miner) view returns(address _payout)",
    "function mintedInBlock(uint256 _block) view returns(uint256 _reward)",
    "function mintedForAccountInBlock(address _payout, uint256 _block) view returns(uint256 _reward)",
  ];

  private provider = getRPCProvider();

  private rewardContract = new ethers.Contract(
    process.env.REWARD_CONTRACT_ADDRESS,
    this.rewardContractABI,
    this.provider
  );

  public async calculateBlockRewards(miner: string, blockNumber: number) {

    const payoutAddress = await this.rewardContract.payoutAddresses(miner, { blockTag: blockNumber });

    const rewardAddress = payoutAddress != 0 ? payoutAddress : miner;

    const minerReward = await this.rewardContract.mintedForAccountInBlock(
      rewardAddress,
      blockNumber
    );

    const rewardTransactions = [{address: rewardAddress, value: minerReward}];

    /*
    * Community found reward is added on 1 block, the genesis block balance for community found is 0 
    */
    if (blockNumber !== 0) {
      rewardTransactions.push({ address: this.communityFundAddress, value: this.communityFundReward })
    }
    return rewardTransactions;
  }
}
