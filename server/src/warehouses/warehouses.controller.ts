import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Warehouse } from './warehouse.entity';
import { JWTGuard } from 'src/auth/jwt/jwt-guard';
import { CreateWarehouseDTO } from './dto/createWarehouse.dto';

@Controller('warehouses')
export class WarehousesController {
    constructor(private readonly warehousesService: WarehousesService) { };

    @Get('all')
    @UseGuards(JWTGuard)
    getAll(): Promise<Warehouse[]> {
        return this.warehousesService.getAll();
    };

    @Get('details/:id')
    @UseGuards(JWTGuard)
    getDetail(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        ) id: number,
    ): Promise<Warehouse> {
        return this.warehousesService.getDetail(id);
    };

    @Get()
    @UseGuards(JWTGuard)
    getByPage(
        @Query(
            'page',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        ) page: number = 1,
        @Query(
            'limit',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        ) limit: number = 10,
    ): Promise<{ data: Warehouse[], total: number }> {
        return this.warehousesService.getByPage(page, limit);
    };

    @Get('newest')
    getNewestWarehouse(): Promise<Warehouse> {
        return this.warehousesService.getNewestWarehouse();
    };

    @Get('deleted')
    getWarehousesDeleted(): Promise<Warehouse[]> {
        return this.warehousesService.getWarehousesDeleted();
    };

    @Post('create')
    @UseGuards(JWTGuard)
    async create(
        @Body() data: CreateWarehouseDTO,
        @Res() response: Response,
    ): Promise<void> {
        try {
            await this.warehousesService.create(data);
            
            response.status(HttpStatus.CREATED).json({
                status: 'success',
                message: 'Tạo kho thành công.',
            });
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Tạo kho thất bại! Vui lòng thử lại sau.',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    @Put('update/:id')
    async update(
        @Param('id') id: number,
        @Body() data: CreateWarehouseDTO,
        @Res() response: Response,
    ): Promise<void> {
        try {
            await this.warehousesService.update(id, data);

            response.status(HttpStatus.OK).json({
                status: 'success',
                message: 'Cập nhật kho thành công.',
            });
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Cập nhật kho thất bại! Vui lòng thử lại sau.',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    @Patch('soft-delete/:id')
    @UseGuards(JWTGuard)
    async softDelete(
        @Param('id') id: number
    ): Promise<{ message: string; }> {
        try {
            await this.warehousesService.softDelete(id);
            return { message: 'Xoá kho thành công! Kho sẽ được đưa vào thùng rác trong 30 ngày' };
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Xoá kho thất bại! Vui lòng thử lại sau.',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        };
    };

    @Patch('restore/:id')
    @UseGuards(JWTGuard)
    async restore(
        @Param('id') id: number
    ): Promise<{ message: string; }> {
        try {
            await this.warehousesService.restore(id);
            return { message: 'Khôi phục kho thành công!' };
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Khôi phục kho thất bại! Vui lòng thử lại sau.',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        };
    };
};
