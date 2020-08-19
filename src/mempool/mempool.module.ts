import { Module } from "@nestjs/common";
import { MempoolController } from "./mempool.controller";
import { MempoolService } from "./mempool.service";

@Module({
  controllers: [MempoolController],
  providers: [MempoolService],
})
export class MempoolModule {}
