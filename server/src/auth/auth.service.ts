import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StaffsService } from 'src/staffs/staffs.service';
import { LoginDTO } from './dto/login.dto';
import { SignupDTO } from './dto/signup.dto';
import { UserDataReponse } from './dto/userDataResponse.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JWTPayloadType } from './jwt/jwt-payload-type';

@Injectable()
export class AuthService {
    constructor(
        private staffService: StaffsService,
        private jwtService: JwtService,
    ) { }

    async signup(data: SignupDTO) {
        let existUser = await this.staffService.findOneByUsername(data.Email, true);

        if (!existUser) {
            existUser = await this.staffService.findOneByUsername(data.PhoneNumber, false);

            if (!existUser) {
                const salt = await bcrypt.genSalt();
                data.Password = await bcrypt.hash(data.Password, salt);
    
                return this.staffService.create(data);
            }
        }
        else {
            throw new UnauthorizedException("Email hoặc số điện thoại đã tồn tại. Hãy thử lại.")
        }
    }

    async login(data: LoginDTO): Promise<UserDataReponse> {
        const isEmail = data.username.includes("@");
        const staff = await this.staffService.findOneByUsername(data.username, isEmail);
        const passwordMatched = await bcrypt.compare(data.password, staff.Password);

        if (passwordMatched) {
            // Send JWT Token
            const payload: JWTPayloadType = {
                userId: staff.id,
                email: staff.Email,
                phoneNumber: staff.PhoneNumber,
            };

            return {
                userId: staff.id,
                fullname: staff.Fullname,
                email: staff.Email,
                phoneNumber: staff.PhoneNumber,
                accessToken: this.jwtService.sign(payload),
            }
        }

        throw new UnauthorizedException("Tài khoản không tồn tại!");
    }
}
