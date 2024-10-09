import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions, typeOrmAsyncConfig } from '../db/data-source';
import configuration from './config/configuration';
import { LoggerMiddleware } from './middlewares/LoggerMiddleware';
import { WarehousesModule } from './warehouses/warehouses.module';
import { StaffsModule } from './staffs/staffs.module';
import { RiceplantsModule } from './riceplants/riceplants.module';
import { CustomersModule } from './customers/customers.module';
import { ReceivingSlipsModule } from './receiving_slips/receiving_slips.module';
import { DispatchSlipsModule } from './dispatch_slips/dispatch_slips.module';
import { ReceivingRicesModule } from './receiving_rices/receiving_rices.module';
import { DispatchRicesModule } from './dispatch_rices/dispatch_rices.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../../', 'public'),
        }),
        ConfigModule.forRoot({
            envFilePath: [
                '.env.development',
                '.env.production',
            ],
            isGlobal: true,
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        TypeOrmModule.forRoot(dataSourceOptions),
        WarehousesModule,
        StaffsModule,
        RiceplantsModule,
        CustomersModule,
        ReceivingSlipsModule,
        DispatchSlipsModule,
        ReceivingRicesModule,
        DispatchRicesModule,
        AuthModule,
        FilesModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
    ],
})

export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
