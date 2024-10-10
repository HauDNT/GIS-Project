import { IsNotEmpty, IsNumber, IsEmail, IsString, Length, IsBoolean } from "class-validator";
import { Warehouse } from "src/warehouses/warehouse.entity";

export class UpdateStaffDTO {
    @IsString()
    @IsNotEmpty({ message: 'Họ tên nhân viên không được để trống' })
    @Length(3, 100, { message: 'Họ tên nhân viên phải có độ dài từ 3 đến 100 ký tự' })
    Fullname: string;

    @IsEmail()
    @IsNotEmpty({ message: 'Email nhân viên không được để trống' })
    @Length(3, 100, { message: 'Email nhân viên phải có độ dài từ 3 đến 100 ký tự' })
    Email: string;

    @IsString()
    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    @Length(10, 10, { message: 'Số điện thoại phải có độ dài 10 ký tự' })
    PhoneNumber: string;

    @IsBoolean()
    @IsNotEmpty({ message: 'Giới tính không hợp lệ' })
    Gender: boolean;

    @IsString()
    @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
    @Length(5, 300, { message: 'Địa chỉ phải có độ dài từ 5 đến 300 ký tự' })
    Address: string;

    @IsNumber()
    warehouse: Warehouse;
}