import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './staff.entity';
import { Repository } from 'typeorm';
import { LoginDTO } from 'src/auth/dto/login.dto';
import { SignupDTO } from 'src/auth/dto/signup.dto';

@Injectable()
export class StaffsService {
    constructor(
        @InjectRepository(Staff)
        private staffRepository: Repository<Staff>
    ) { }

    async create(data: SignupDTO) {
        await this.staffRepository.save(data);
        return {message: "Tạo tài khoản thành công"}
    };

    async findOneByUsername(username: string, isEmail: boolean): Promise<Staff> {
        let staff = undefined;

        if (isEmail) {
            staff = await this.staffRepository.findOneBy({ Email: username })
        }
        else {
            staff = await this.staffRepository.findOneBy({ PhoneNumber: username })
        }

        return staff;
    };

    async getAll(): Promise<Staff[]> {
        const staffs = await this.staffRepository.find({
            select: [
                'id',
                'Fullname',
                'Gender',
                'Address',
                'Email',
                'PhoneNumber',
            ],
        });

        return staffs;
    };

    async softDelete(id: number): Promise<Staff> {
        const staff = await this.staffRepository.findOneBy({id});

        staff.isDeleted = true;
        staff.deletedAt = new Date();
        
        return this.staffRepository.save(staff);
    };

    async restore(id: number): Promise<Staff> {
        const staff = await this.staffRepository.findOneBy({id});

        staff.isDeleted = false;
        staff.deletedAt = null;

        return this.staffRepository.save(staff);
    };
}
