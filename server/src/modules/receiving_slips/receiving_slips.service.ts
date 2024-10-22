import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReceivingSlip } from './receiving_slip.entity';
import { Int32, Repository } from 'typeorm';
import { CreateReceiveSlipDTO } from './dto/createReceiveSlip.dto';

@Injectable()
export class ReceivingSlipsService {
    constructor(
        @InjectRepository(ReceivingSlip)
        private receiveSlipRepository: Repository<ReceivingSlip>,
    ) { };

    calTotalPrice(receiveRices: any): number {
        const total = receiveRices.reduce((
            sum: number,
            item: { Amount: number, UnitPrice: number }
        ) => {
            return sum + (item.Amount * item.UnitPrice)
        }, 0);

        return total;
    };

    async getByPage(page: number, limit: number): Promise<{ billInfo: ReceivingSlip; totalBill: number; }[]> {
        const offset = (page - 1) * limit;
        const bills = await this.receiveSlipRepository.find({
            take: limit,
            skip: offset,
            relations: [
                'customer',
                'staff',
                'warehouse',
                'receiveRices',
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
                receiveRices: true,
                CreatedAt: true,
            },
            order: {
                CreatedAt: "DESC",
            },
        });

        const result = bills.map((bill) => {
            const totalBill = this.calTotalPrice(bill.receiveRices);

            return {
                billInfo: bill,
                totalBill,
            };
        });

        return result;
    };

    async getAmount(): Promise<number> {
        const amount = await this.receiveSlipRepository.findAndCount();

        return amount[1];
    };

    async create(data: CreateReceiveSlipDTO): Promise<ReceivingSlip> {
        const newReceiveBill = new ReceivingSlip();

        newReceiveBill.ID_Staff = data.staffId;
        newReceiveBill.ID_Customer = data.customerId;
        newReceiveBill.ID_Warehouse = data.warehouseId;
        newReceiveBill.CreatedAt = new Date();

        return await this.receiveSlipRepository.save(newReceiveBill);
    };
}
