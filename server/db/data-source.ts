import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (
        configService: ConfigService,
    ): Promise<TypeOrmModuleOptions> => {
        return {
            type: 'mysql',
            host: configService.get<string>('dbHost'),
            port: configService.get<number>('dbPort'),
            database: configService.get<string>('dbName'),
            username: configService.get<string>('dbUsername'),
            password: configService.get<string>('dbPassword'),
            entities: ['dist/**/*.entity.js'],
            synchronize: false,
            migrations: ['dist/db/migrations/*.js'],
        }
    }
};

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3310,
    username: 'root',
    password: '123456',
    database: 'geographic-information-system',
    entities: ['dist/**/*.entity.js'],
    synchronize: false,
    migrations: ['dist/db/migrations/*.js'],
};

// Khởi tạo 1 DataSource
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;