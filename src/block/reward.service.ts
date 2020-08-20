import { Injectable } from "@nestjs/common";
import { BigNumber, ethers } from "ethers";

import { getRPCProvider } from "../utils/client";

@Injectable()
export class RewardService {
  private communityFundReward = BigNumber.from("600900558100000000");
  private communityFundAddressStorageLocation = 11;

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

    const communityFundAddress = ethers.utils.hexStripZeros(
      await provider.getStorageAt(
        rewardContract.address,
        this.communityFundAddressStorageLocation,
        blockNumber
      )
    );

    const payoutAddress = await rewardContract.payoutAddresses(miner);

    const rewardAddress = payoutAddress != 0 ? payoutAddress : miner;

    const minerReward = await rewardContract.mintedForAccountInBlock(
      rewardAddress,
      blockNumber
    );

    return [
      { address: rewardAddress, value: minerReward },
      { address: communityFundAddress, value: this.communityFundReward },
    ];
  }
}
