import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Put, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { Staff } from './staff.entity';
import { StaffsService } from './staffs.service';
import { JWTGuard } from 'src/auth/jwt/jwt-guard';
import { UpdateStaffDTO } from './dto/updateStaff.dto';

@Controller('staffs')
@UseInterceptors(ClassSerializerInterceptor)    // Using with Exclude entities
export class StaffsController {
    constructor(private readonly staffsService: StaffsService) { }

    @Get('all')
    @UseGuards(JWTGuard)
    getAll(): Promise<Staff[]> {
        return this.staffsService.getAll();
    };

    @Get('details/:id')
    @UseGuards(JWTGuard)
    getDetail(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        ) id: number,
    ): Promise<Staff> {
        return this.staffsService.getDetail(id);
    };

    @Get('deleted')
    @UseGuards(JWTGuard)
    getStaffsDeleted(): Promise<Staff[]> {
        return this.staffsService.getStaffsDeleted();
    };

    @Put('update/:id')
    async update(
        @Param('id') id: number,
        @Body() data: UpdateStaffDTO,
        @Res() response: Response,
    ): Promise<void> {
        try {
            const updateStatus = await this.staffsService.update(id, data);

            if (updateStatus) {
                response.status(HttpStatus.OK).json({
                    status: 'success',
                    message: 'Cập nhật thông tin nhân viên thành công.',
                });
            };

            response.status(HttpStatus.BAD_REQUEST).json({
                status: 'failed',
                message: 'Cập nhật thông tin nhân viên thất bại.',
            });
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Cập nhật thông tin nhân viên thất bại! Vui lòng thử lại sau.',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    @Patch('soft-delete/:id')
    @UseGuards(JWTGuard)
    async softDelete(
        @Param('id') id: number
    ): Promise<{ message: string; }> {
        try {
            await this.staffsService.softDelete(id);
            return { message: 'Xoá nhân viên thành công! Nhân viên sẽ được đưa vào thùng rác trong 30 ngày' };
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Xoá nhân viên thất bại! Vui lòng thử lại sau.',
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
            await this.staffsService.restore(id);
            return { message: 'Khôi phục nhân viên thành công!' };
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Khôi phục nhân viên thất bại! Vui lòng thử lại sau.',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        };
    };
}
