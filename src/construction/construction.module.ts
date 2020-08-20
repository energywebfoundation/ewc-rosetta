import { Module } from '@nestjs/common';
import { ConstructionController } from './construction.controller';
import { ConstructionService } from './construction.service';

@Module({
  controllers: [ConstructionController],
  providers: [ConstructionService]
})
export class ConstructionModule {}
