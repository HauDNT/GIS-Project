import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StaffsService } from 'src/staffs/staffs.service';
import { LoginDTO } from './dto/login.dto';
import { SignupDTO } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private staffService: StaffsService,
        private jwtService: JwtService,
    ) { }

    async signup(data: SignupDTO) {
        let existUser = await this.staffService.findOneByUsername(data.Email, true);

        existUser = await this.staffService.findOneByUsername(data.SoDienThoai, false);

        if (!existUser) {
            const salt = await bcrypt.genSalt();            
            data.MatKhau = await bcrypt.hash(data.MatKhau, salt);

            return this.staffService.create(data);
        }
        else {
            throw new UnauthorizedException("Email hoặc số điện thoại đã tồn tại. Hãy thử lại.")
        }
    }

    async login(data: LoginDTO) {
        const isEmail = data.username.includes("@");
        const staff = await this.staffService.findOneByUsername(data.username, isEmail);
        const isPasswordMatched = await bcrypt.compare(data.password, staff.MatKhau);

        if (isPasswordMatched) {
            return staff;
        }

        throw new UnauthorizedException("Tài khoản không tồn tại!");
    }
}
