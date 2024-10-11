import { Controller } from '@nestjs/common';
import { ReceivingSlipsService } from './receiving_slips.service';

@Controller('receiving-slips')
export class ReceivingSlipsController {
  constructor(private readonly receivingSlipsService: ReceivingSlipsService) {}
}
