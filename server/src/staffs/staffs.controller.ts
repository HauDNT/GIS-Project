import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { Staff } from './staff.entity';
import { StaffsService } from './staffs.service';
import { JWTGuard } from 'src/auth/jwt/jwt-guard';

@Controller('staffs')
@UseInterceptors(ClassSerializerInterceptor)    // Using with Exclude entities
export class StaffsController {
    constructor(private readonly staffsService: StaffsService) { }

    @Get('all')
    getAll(): Promise<Staff[]> {
        return this.staffsService.getAll();
    };

    @Get('deleted')
    @UseGuards(JWTGuard)
    getStaffsDeleted(): Promise<Staff[]> {
        return this.staffsService.getStaffsDeleted();
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
