import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockController } from './block/block.controller';
import { AccountController } from './account/account.controller';

@Module({
  imports: [],
  controllers: [AppController, BlockController, AccountController],
  providers: [AppService],
})
export class AppModule {}
