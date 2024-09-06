import { Module } from '@nestjs/common';
import { ReceivingSlipsService } from './receiving_slips.service';
import { ReceivingSlipsController } from './receiving_slips.controller';

@Module({
  controllers: [ReceivingSlipsController],
  providers: [ReceivingSlipsService],
})
export class ReceivingSlipsModule {}
