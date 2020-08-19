import { Module } from "@nestjs/common";
import { BlockModule } from "./block/block.module";
import { AccountModule } from "./account/account.module";
import { NetworkModule } from "./network/network.module";

@Module({
  imports: [BlockModule, AccountModule, NetworkModule],
})
export class AppModule {}
