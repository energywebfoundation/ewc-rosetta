import { Module } from "@nestjs/common";
import { BlockModule } from "./block/block.module";
import { AccountModule } from "./account/account.module";

@Module({
  imports: [BlockModule, AccountModule],
})
export class AppModule {}
