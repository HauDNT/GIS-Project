import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './jwt/jwt-strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StaffsModule } from 'src/staffs/staffs.module';
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        StaffsModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('secretKey'),
                signOptions: {
                    expiresIn: '1d',
                }
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JWTStrategy],
})
export class AuthModule { }
