import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReceivingRice } from './receiving_rice.entity';
import { Repository } from 'typeorm';
import { CreateReceiveRicesDTO } from './dto/createReceiveRices.dto';

@Injectable()
export class ReceivingRicesService {
    constructor(
        @InjectRepository(ReceivingRice)
        private receiveRiceRepository: Repository<ReceivingRice>,
    ) { };

    async create(data: CreateReceiveRicesDTO): Promise<boolean> {
        try {
            for (const riceplant of data.listRices) {
                const newReceiveRice = {
                    ID_ReceivingSlip: data.receiveSlipId,
                    ID_RicePlant: riceplant.id,
                    UnitPrice: riceplant.UnitPrice,
                    Amount: riceplant.Amount,
                };

                await this.receiveRiceRepository.save(newReceiveRice);
            };

            return true;
        } catch (error) {
            console.log('Xảy ra lỗi trong lúc thêm danh sách lúa vào đơn nhận: ', error);
            return false;
        };
    };
}
