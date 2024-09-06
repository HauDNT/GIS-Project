import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, Length } from "class-validator";

export class SignupDTO {
    @IsString()
    @IsNotEmpty()
    HoTen: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    Email: string;

    @IsString()
    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    @Length(10, 10, { message: 'Số điện thoại phải có độ dài có 10 ký tự' })
    SoDienThoai: string;
    
    @IsString()
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @Length(8, 16, { message: 'Mật khẩu phải có độ dài từ 8 đến 16 ký tự' })
    MatKhau: string;

    @IsNotEmpty()
    GioiTinh: boolean;

    @IsString()
    @IsNotEmpty()
    DiaChi: string;
}