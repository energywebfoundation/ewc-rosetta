import { Module } from "@nestjs/common";
import { BlockModule } from "./block/block.module";
import { ConstructionModule } from './construction/construction.module';
import { AccountModule } from "./account/account.module";

@Module({
  imports: [BlockModule, AccountModule, ConstructionModule],
})
export class AppModule {}
