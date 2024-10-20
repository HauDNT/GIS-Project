import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { ReceivingSlipsService } from './receiving_slips.service';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { ReceivingSlip } from './receiving_slip.entity';
import { CreateReceiveSlipDTO } from './dto/createReceiveSlip.dto';
import { createErrorResponse, createSuccessResponse } from 'src/common/helper/response.helper';
import { JWTGuard } from '../auth/jwt/jwt-guard';

@Controller('receiving-slips')
export class ReceivingSlipsController {
    constructor(private readonly receivingSlipsService: ReceivingSlipsService) { }

    @UseGuards(JWTGuard)
    @Get()
    async getByPage(
        @Query('page') page: number,
        @Query('limit') limit: number = 10,
    ): Promise<ApiResponseDto<{ billInfo: ReceivingSlip; totalBill: number; }[]>> {
        try {
            const bills = await this.receivingSlipsService.getByPage(page, limit);
            return createSuccessResponse('Lấy dữ liệu hoá đơn nhập kho thành công', bills);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Lấy dữ liệu hoá đơn nhập kho thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @UseGuards(JWTGuard)
    @Post('create')
    async create(
        @Body() data: CreateReceiveSlipDTO,
    ): Promise<ApiResponseDto<ReceivingSlip>> {
        try {
            const receiveBill = await this.receivingSlipsService.create(data);
            return createSuccessResponse('Tạo hoá đơn nhận thành công', receiveBill);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Tạo hoá đơn nhận thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };
}
