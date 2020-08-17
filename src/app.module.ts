import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { BlockModule } from "./block/block.module";

@Module({
  imports: [BlockModule],
  providers: [AppService],
})
export class AppModule {}
