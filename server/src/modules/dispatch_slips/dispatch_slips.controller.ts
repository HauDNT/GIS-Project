import { Controller } from '@nestjs/common';
import { DispatchSlipsService } from './dispatch_slips.service';

@Controller('dispatch-slips')
export class DispatchSlipsController {
  constructor(private readonly dispatchSlipsService: DispatchSlipsService) {}
}
