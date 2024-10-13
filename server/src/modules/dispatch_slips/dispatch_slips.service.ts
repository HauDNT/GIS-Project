import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDispatchSlipDTO } from './dto/createDispatchSlip.dto';
import { DispatchSlip } from './dispatch_slip.entity';

@Injectable()
export class DispatchSlipsService {
    constructor(
        @InjectRepository(DispatchSlip)
        private readonly dispatchSlipRepository: Repository<DispatchSlip>,
    ) { }

    async create(data: CreateDispatchSlipDTO): Promise<DispatchSlip> {
        const newDispatchBill = new DispatchSlip();

        newDispatchBill.ID_Staff = data.staffId;
        newDispatchBill.ID_Customer = data.customerId;
        newDispatchBill.ID_Warehouse = data.warehouseId;
        newDispatchBill.CreatedAt = new Date();

        return await this.dispatchSlipRepository.save(newDispatchBill);
    };
}
