import { Module } from "@nestjs/common";
import { BlockModule } from "./block/block.module";
import { AccountModule } from "./account/account.module";
import { MempoolModule } from "./mempool/mempool.module";

@Module({
  imports: [BlockModule, AccountModule, MempoolModule],
})
export class AppModule {}
