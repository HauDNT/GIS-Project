import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    UseGuards
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './customer.entity';
import { Create_UpdateCustomerDTO } from './dto/create_update-customer.dto';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { createErrorResponse, createSuccessResponse } from 'src/common/helper/response.helper';
import { JWTGuard } from '../auth/jwt/jwt-guard';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) { }

    @Get('all')
    async getAll(): Promise<ApiResponseDto<Customer[]>> {
        try {
            const customers = await this.customersService.getAll();
            return createSuccessResponse('Lấy danh sách khách hàng thành công.', customers);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Lấy danh sách khách hàng thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Post('create')
    @UseGuards(JWTGuard)
    async create(
        @Body() data: Create_UpdateCustomerDTO,
    ): Promise<ApiResponseDto<any>> {
        try {
            const newCustomer = await this.customersService.create(data);

            return createSuccessResponse('Thêm khách hàng mới thành công!', newCustomer);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Thêm khách hàng mới thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

}
