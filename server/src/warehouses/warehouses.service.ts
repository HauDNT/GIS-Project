import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './warehouse.entity';
import { CreateWarehouseDTO } from './dto/createWarehouse.dto';


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

    async create(data: CreateWarehouseDTO): Promise<Warehouse> {
        const newWarehouse = new Warehouse();

        newWarehouse.Name = data.Name;
        newWarehouse.Address = data.Address;
        newWarehouse.Latitude = data.Latitude;
        newWarehouse.Longitude = data.Longitude;

        return this.warehouseRepository.save(newWarehouse);
    }


}
