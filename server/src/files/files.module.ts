import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from 'src/warehouses/warehouse.entity';
import { Staff } from 'src/staffs/staff.entity';
import { Customer } from 'src/customers/customer.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Warehouse]),
        TypeOrmModule.forFeature([Staff]),
        TypeOrmModule.forFeature([Customer]),
    ],
    controllers: [FilesController],
    providers: [FilesService],
})
export class FilesModule {}
