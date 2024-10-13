import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
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
