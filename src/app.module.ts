import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockController } from './block/block.controller';

@Module({
  imports: [],
  controllers: [AppController, BlockController],
  providers: [AppService],
})
export class AppModule {}
