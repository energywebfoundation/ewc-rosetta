import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { MempoolController } from "./mempool.controller";
import { MempoolService } from "./mempool.service";

@Module({
  controllers: [MempoolController],
  providers: [MempoolService],
  imports: [
    ScheduleModule.forRoot()
  ]
  
})
export class MempoolModule {}
