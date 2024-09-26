import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
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

    @Get()
    @UseGuards(JWTGuard)
    getByPage(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<{data: Warehouse[], total: number}> {
        return this.warehousesService.getByPage(page, limit);
    }

    @Get('newest')
    getNewestWarehouse(): Promise<Warehouse> {
        return this.warehousesService.getNewestWarehouse();
    }

    @Post('create')
    @UseGuards(JWTGuard)
    create(
        @Body() data: CreateWarehouseDTO,
    ): Promise<Warehouse> {
        return this.warehousesService.create(data);
    }
}
