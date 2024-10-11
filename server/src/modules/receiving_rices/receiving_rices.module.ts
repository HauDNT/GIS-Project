import { Module } from '@nestjs/common';
import { ReceivingRicesService } from './receiving_rices.service';
import { ReceivingRicesController } from './receiving_rices.controller';

@Module({
  controllers: [ReceivingRicesController],
  providers: [ReceivingRicesService],
})
export class ReceivingRicesModule {}
