import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { SignupDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('signup')
    signup(
        @Body()
        data: SignupDTO,
    ) {
        return this.authService.signup(data);
    }

    @Post('login')
    login(
        @Body()
        data: LoginDTO,
    ) {
        return this.authService.login(data);
    }
}
