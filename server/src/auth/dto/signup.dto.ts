import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, Length } from "class-validator";

export class SignupDTO {
    @IsString()
    @IsNotEmpty()
    Fullname: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    Email: string;

    @IsString()
    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    @Length(10, 10, { message: 'Số điện thoại phải có độ dài có 10 ký tự' })
    PhoneNumber: string;
    
    @IsString()
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @Length(8, 16, { message: 'Mật khẩu phải có độ dài từ 8 đến 16 ký tự' })
    Password: string;

    @IsNotEmpty()
    Gender: boolean;

    @IsString()
    @IsNotEmpty()
    Address: string;
}