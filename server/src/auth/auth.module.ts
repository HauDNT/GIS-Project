import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StaffsModule } from 'src/staffs/staffs.module';

@Module({
    imports: [StaffsModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
