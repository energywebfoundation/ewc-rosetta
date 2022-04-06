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

  public async getMinerReward({ blockNumber, miner, payoutAddress }: { payoutAddress: string, miner: string, blockNumber: number }): Promise<{ address: string, value: BigInt } | null> {
    const payoutReward = await this.rewardContract.mintedForAccountInBlock(
      payoutAddress,
      blockNumber
    );
    if (payoutReward.toString() !== '0') {
      return {
        address: payoutAddress,
        value: payoutReward
      }
    }

    const minerReward = await this.rewardContract.mintedForAccountInBlock(
      miner,
      blockNumber
    );

    if (minerReward.toString() !== '0') {
      return {
        address: miner,
        value: minerReward
      }
    }
    return null
  }

  public async calculateBlockRewards(miner: string, blockNumber: number) {


    // const communityFundAddress = ethers.utils.hexStripZeros(
    //   await provider.getStorageAt(
    //     rewardContract.address,
    //     this.communityFundAddressStorageLocation,
    //     blockNumber
    //   )
    // );

    const payoutAddress = await this.rewardContract.payoutAddresses(miner);

    const rewardAddress = payoutAddress != 0 ? payoutAddress : miner;

    const rewardTransactions = [];

    const minerReward = await this.getMinerReward({ blockNumber, miner, payoutAddress: rewardAddress })

    if (minerReward) {
      rewardTransactions.push(minerReward)
    }

    /*
    * Community found reward is added on 1 block, the genesis block balance for community found is 0 
    */
    if (blockNumber !== 0) {
      rewardTransactions.push({ address: this.communityFundAddress, value: this.communityFundReward })
    }
    return rewardTransactions;
  }
}
