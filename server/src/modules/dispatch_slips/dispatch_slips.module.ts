import { Module } from '@nestjs/common';
import { DispatchSlipsService } from './dispatch_slips.service';
import { DispatchSlipsController } from './dispatch_slips.controller';

@Module({
  controllers: [DispatchSlipsController],
  providers: [DispatchSlipsService],
})
export class DispatchSlipsModule {}
