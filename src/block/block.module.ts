import { Module } from "@nestjs/common";
import { BlockController } from "./block.controller";
import { RewardService } from "./reward.service";
import { BlockService } from "./block.service";

@Module({
  controllers: [BlockController],
  providers: [RewardService, BlockService],
})
export class BlockModule {}
