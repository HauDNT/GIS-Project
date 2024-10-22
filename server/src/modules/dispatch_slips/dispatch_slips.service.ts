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
    ) { };

    calTotalPrice(dispatchRices: any): number {
        const total = dispatchRices.reduce((
            sum: number,
            item: { Amount: number, UnitPrice: number }
        ) => {
            return sum + (item.Amount * item.UnitPrice)
        }, 0);

        return total;
    };

    async getByPage(page: number, limit: number): Promise<{ billInfo: DispatchSlip; totalBill: number; }[]> {
        const offset = (page - 1) * limit;
        const bills = await this.dispatchSlipRepository.find({
            take: limit,
            skip: offset,
            relations: [
                'customer',
                'staff',
                'warehouse',
                'dispatchRices',
            ],
            select: {
                id: true,
                customer: {
                    id: true,
                    Fullname: true,
                },
                staff: {
                    id: true,
                    Fullname: true,
                },
                warehouse: {
                    id: true,
                    Name: true,
                },
                dispatchRices: true,
                CreatedAt: true,
            },
            order: {
                CreatedAt: "DESC",
            },
        });

        const result = bills.map((bill) => {
            const totalBill = this.calTotalPrice(bill.dispatchRices);

            return {
                billInfo: bill,
                totalBill,
            };
        });

        return result;
    };

    async getAmount(): Promise<number> {
        const amount = await this.dispatchSlipRepository.findAndCount();

        return amount[1];
    };

    async create(data: CreateDispatchSlipDTO): Promise<DispatchSlip> {
        const newDispatchBill = new DispatchSlip();

        newDispatchBill.ID_Staff = data.staffId;
        newDispatchBill.ID_Customer = data.customerId;
        newDispatchBill.ID_Warehouse = data.warehouseId;
        newDispatchBill.CreatedAt = new Date();

        return await this.dispatchSlipRepository.save(newDispatchBill);
    };
}
