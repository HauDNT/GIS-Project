import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './staff.entity';
import { Repository } from 'typeorm';
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
    }

    async findOneByUsername(username: string, isEmail: boolean): Promise<Staff> {
        let staff = undefined;
        if (isEmail) {
            staff = await this.staffRepository.findOneBy({ Email: username })
        }
        else {
            staff = await this.staffRepository.findOneBy({ SoDienThoai: username })
        }

        return staff;
    }
}
