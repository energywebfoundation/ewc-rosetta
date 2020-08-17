import { Injectable } from "@nestjs/common";
import { ethers } from "ethers";
import { getRPCProvider } from "src/utils/client";

@Injectable()
export class RewardService {
  private rewardContractABI = [
    "function payoutAddresses(address _miner) view returns(address _payout)",
    "function mintedInBlock(uint256 _block) view returns(uint256 _reward)",
    "function mintedForAccountInBlock(address _payout, uint256 _block) view returns(uint256 _reward)",
  ];

  public async calculateBlockRewards(miner: string, blockNumber: number) {
    const provider = getRPCProvider();

    const rewardContract = new ethers.Contract(
      process.env.REWARD_CONTRACT_ADDRESS,
      this.rewardContractABI,
      provider
    );

    const payoutAddress = await rewardContract.payoutAddresses(miner);

    const minerReward = await rewardContract.mintedForAccountInBlock(
      payoutAddress,
      blockNumber
    );

    return { address: payoutAddress, value: minerReward };
  }
}
