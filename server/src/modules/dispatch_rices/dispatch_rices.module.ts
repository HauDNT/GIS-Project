import { Module } from '@nestjs/common';
import { DispatchRicesService } from './dispatch_rices.service';
import { DispatchRicesController } from './dispatch_rices.controller';

@Module({
  controllers: [DispatchRicesController],
  providers: [DispatchRicesService],
})
export class DispatchRicesModule {}
