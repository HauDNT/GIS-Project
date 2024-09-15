import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { Warehouse } from './warehouse.entity';
import { JWTGuard } from 'src/auth/jwt/jwt-guard';
import { CreateWarehouseDTO } from './dto/createWarehouse.dto';

@Controller('warehouses')
export class WarehousesController {
    constructor(private readonly warehousesService: WarehousesService) { }

    @Get('all')
    @UseGuards(JWTGuard)
    getAll(): Promise<Warehouse[]> {
        return this.warehousesService.getAll();
    }

    @Post('create')
    @UseGuards(JWTGuard)
    create(
        @Body() data: CreateWarehouseDTO,
    ): Promise<Warehouse> {
        return this.warehousesService.create(data);
    }
}
