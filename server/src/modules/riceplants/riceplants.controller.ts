import { Controller } from '@nestjs/common';
import { RiceplantsService } from './riceplants.service';

@Controller('riceplants')
export class RiceplantsController {
  constructor(private readonly riceplantsService: RiceplantsService) {}
}
