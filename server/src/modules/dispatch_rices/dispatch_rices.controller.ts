import { Controller } from '@nestjs/common';
import { DispatchRicesService } from './dispatch_rices.service';

@Controller('dispatch-rices')
export class DispatchRicesController {
  constructor(private readonly dispatchRicesService: DispatchRicesService) {}
}
