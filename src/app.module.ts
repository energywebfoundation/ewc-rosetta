import { Module } from "@nestjs/common";
import { BlockModule } from "./block/block.module";

@Module({
  imports: [BlockModule],
})
export class AppModule {}
