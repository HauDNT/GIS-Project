import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehousesModule } from './warehouses/warehouses.module';
import { StaffsModule } from './staffs/staffs.module';
import { Warehouse } from './warehouses/warehouse.entity';
import { Staff } from './staffs/staff.entity';
import { RiceplantsModule } from './riceplants/riceplants.module';
import { RicePlant } from './riceplants/riceplant.entity';
import { CustomersModule } from './customers/customers.module';
import { Customer } from './customers/customer.entity';
import { ReceivingSlipsModule } from './receiving_slips/receiving_slips.module';
import { ReceivingSlip } from './receiving_slips/receiving_slip.entity';
import { DispatchSlipsModule } from './dispatch_slips/dispatch_slips.module';
import { DispatchSlip } from './dispatch_slips/dispatch_slip.entity';
import { ReceivingRicesModule } from './receiving_rices/receiving_rices.module';
import { DispatchRicesModule } from './dispatch_rices/dispatch_rices.module';
import { DispatchRice } from './dispatch_rices/dispatch_rice.entity';
import { ReceivingRice } from './receiving_rices/receiving_rice.entity';
import { AuthModule } from './auth/auth.module';
import { typeOrmAsyncConfig } from './db/data-source';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [
                '.env.development',
                '.env.production',
            ],
            isGlobal: true,
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        WarehousesModule,
        StaffsModule,
        RiceplantsModule,
        CustomersModule,
        ReceivingSlipsModule,
        DispatchSlipsModule,
        ReceivingRicesModule,
        DispatchRicesModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
