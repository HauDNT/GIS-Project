import { Controller, Get, UseGuards } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { Warehouse } from './warehouse.entity';
import { JWTGuard } from 'src/auth/jwt/jwt-guard';

@Controller('warehouses')
export class WarehousesController {
    constructor(private readonly warehousesService: WarehousesService) { }

    @Get('all')
    // @UseGuards(JWTGuard)
    getAll(): Promise<Warehouse[]> {
        return this.warehousesService.getAll();
    }
}
