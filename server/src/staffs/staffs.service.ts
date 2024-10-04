import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './staff.entity';
import { Repository } from 'typeorm';
import { SignupDTO } from 'src/auth/dto/signup.dto';
import { omitFields } from '../utils/omit_field.utils';

@Injectable()
export class StaffsService {
    constructor(
        @InjectRepository(Staff)
        private staffRepository: Repository<Staff>
    ) { };

    async getAll(): Promise<Staff[]> {
        const staffs = await this.staffRepository.find();

        return omitFields(staffs, ['deletedAt', 'isDeleted']);
    };

    async getStaffsDeleted(): Promise<Staff[]> {
        const staffsDeleted = await this.staffRepository.find({
            where: { isDeleted: true },
        });

        staffsDeleted.forEach((staff, index) => {
            staffsDeleted[index] = omitFields(staff, ['isDeleted', 'Password']);
        });

        return staffsDeleted;
    };

    async findOneByUsername(username: string, isEmail: boolean): Promise<Staff> {
        let staff = undefined;

        if (isEmail) {
            staff = await this.staffRepository.findOneBy({
                Email: username,
                isDeleted: false,
            });
        }
        else {
            staff = await this.staffRepository.findOneBy({
                PhoneNumber: username,
                isDeleted: false,
            });
        };

        return staff;
    };

    async create(data: SignupDTO) {
        await this.staffRepository.save(data);
        return { message: "Tạo tài khoản thành công" }
    };

    async softDelete(id: number): Promise<Staff> {
        const staff = await this.staffRepository.findOneBy({ id });

        staff.isDeleted = true;
        staff.deletedAt = new Date();

        return this.staffRepository.save(staff);
    };

    async restore(id: number): Promise<Staff> {
        const staff = await this.staffRepository.findOneBy({ id });

        staff.isDeleted = false;
        staff.deletedAt = null;

        return this.staffRepository.save(staff);
    };
}
