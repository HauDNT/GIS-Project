import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReceivingSlip } from './receiving_slip.entity';
import { Repository } from 'typeorm';
import { CreateReceiveSlipDTO } from './dto/createReceiveSlip.dto';

@Injectable()
export class ReceivingSlipsService {
    constructor(
        @InjectRepository(ReceivingSlip)
        private receiveSlipRepository: Repository<ReceivingSlip>,
    ) { }

    async create(data: CreateReceiveSlipDTO): Promise<ReceivingSlip> {
        const newReceiveBill = new ReceivingSlip();

        newReceiveBill.ID_Staff = data.staffId;
        newReceiveBill.ID_Customer = data.customerId;
        newReceiveBill.ID_Warehouse = data.warehouseId;
        newReceiveBill.CreatedAt = new Date();

        return await this.receiveSlipRepository.save(newReceiveBill);
    }
}
