import { Controller } from '@nestjs/common';
import { ReceivingRicesService } from './receiving_rices.service';

@Controller('receiving-rices')
export class ReceivingRicesController {
  constructor(private readonly receivingRicesService: ReceivingRicesService) {}
}
