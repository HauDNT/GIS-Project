import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DispatchRice } from './dispatch_rice.entity';
import { CreateDispatchRicesDTO } from './dto/createDispatchRices.dto';

@Injectable()
export class DispatchRicesService {
    constructor(
        @InjectRepository(DispatchRice)
        private dispatchRiceRepository: Repository<DispatchRice>,
    ) { };

    async create(data: CreateDispatchRicesDTO): Promise<boolean> {
        try {
            for (const riceplant of data.listRices) {
                const newDispatchRice = {
                    ID_DispatchSlip: data.dispatchSlipId,
                    ID_RicePlant: riceplant.id,
                    UnitPrice: riceplant.UnitPrice,
                    Amount: riceplant.Amount,
                };

                await this.dispatchRiceRepository.save(newDispatchRice);
            };

            return true;
        } catch (error) {
            console.log('Xảy ra lỗi trong lúc thêm danh sách lúa vào đơn xuất: ', error);
            return false;
        };
    };
}
