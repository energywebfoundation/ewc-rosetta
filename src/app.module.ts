import { Module } from "@nestjs/common";
import { BlockModule } from "./block/block.module";
import { ConstructionModule } from './construction/construction.module';

@Module({
  imports: [BlockModule, ConstructionModule],
})
export class AppModule {}
