import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { DispatchSlipsService } from './dispatch_slips.service';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { createErrorResponse, createSuccessResponse } from 'src/common/helper/response.helper';
import { JWTGuard } from '../auth/jwt/jwt-guard';
import { CreateDispatchSlipDTO } from './dto/createDispatchSlip.dto';
import { DispatchSlip } from './dispatch_slip.entity';

@Controller('dispatch-slips')
export class DispatchSlipsController {
    constructor(private readonly dispatchSlipsService: DispatchSlipsService) {}

    @UseGuards(JWTGuard)
    @Post('create')
    async create(
        @Body() data: CreateDispatchSlipDTO,
    ): Promise<ApiResponseDto<DispatchSlip>> {
        try {
            const receiveRices = await this.dispatchSlipsService.create(data);
            return createSuccessResponse('Tạo hoá đơn xuất thành công', receiveRices);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Tạo hoá đơn xuất thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };
}
