import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ReceivingRicesService } from './receiving_rices.service';
import { CreateReceiveRicesDTO } from './dto/createReceiveRices.dto';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { createErrorResponse, createSuccessResponse } from 'src/common/helper/response.helper';
import { JWTGuard } from '../auth/jwt/jwt-guard';

@Controller('receiving-rices')
export class ReceivingRicesController {
    constructor(private readonly receivingRicesService: ReceivingRicesService) { }

    @UseGuards(JWTGuard)
    @Post('create')
    async create(
        @Body() data: CreateReceiveRicesDTO,
    ): Promise<ApiResponseDto<boolean>> {
        try {
            const receiveRices = await this.receivingRicesService.create(data);
            return createSuccessResponse('Tạo hoá đơn nhận thành công', receiveRices);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Tạo hoá đơn nhận thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };
}
