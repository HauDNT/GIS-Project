import { Module } from '@nestjs/common';
import { RiceplantsService } from './riceplants.service';
import { RiceplantsController } from './riceplants.controller';

@Module({
  controllers: [RiceplantsController],
  providers: [RiceplantsService],
})
export class RiceplantsModule {}
