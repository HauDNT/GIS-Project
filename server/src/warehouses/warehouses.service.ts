import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './warehouse.entity';


@Injectable()
export class WarehousesService {
    constructor(
        @InjectRepository(Warehouse)
        private warehouseRepository: Repository<Warehouse>
    ) { }
    
    async getAll(): Promise<Warehouse[]> {
        const result = await this.warehouseRepository.find();

        return result;
    }


}
