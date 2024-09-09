import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";

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
}