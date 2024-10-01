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
    ) { };

    async getAll(): Promise<Warehouse[]> {
        const result = await this.warehouseRepository.find({ where: { isDeleted: false } });

        return result;
    };

    async getByPage(
        page: number,
        limit: number
    ): Promise<{ data: Warehouse[], total: number }> {
        const [data, total] = await this.warehouseRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            where: { isDeleted: false }
        });

        return {
            data,
            total,
        };
    };

    async getNewestWarehouse(): Promise<Warehouse> {
        const result = await this.warehouseRepository.find({
            order: { id: 'DESC' },
            take: 1,
        });

        return result[0];
    };

    async create(data: CreateWarehouseDTO): Promise<Warehouse> {
        const newWarehouse = new Warehouse();

        newWarehouse.Name = data.Name;
        newWarehouse.Address = data.Address;
        newWarehouse.Latitude = data.Latitude;
        newWarehouse.Longitude = data.Longitude;

        return this.warehouseRepository.save(newWarehouse);
    };

    async softDelete(id: number): Promise<Warehouse> {
        const warehouse = await this.warehouseRepository.findOneBy({id});
        warehouse.isDeleted = true;

        return this.warehouseRepository.save(warehouse);
    };

    async restore(id: number): Promise<Warehouse> {
        const warehouse = await this.warehouseRepository.findOneBy({id});
        warehouse.isDeleted = false;

        return this.warehouseRepository.save(warehouse);
    };
}
