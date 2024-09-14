import { MigrationInterface, QueryRunner } from "typeorm";

export class SetCharsetForAllTables16712345678901726286322483 implements MigrationInterface {
    name = 'SetCharsetForAllTables16712345678901726286322483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Đặt charset cho tất cả các bảng
        const tables = await queryRunner.query(`SHOW TABLES`);
        for (const table of tables) {
            const tableName = table[`Tables_in_${queryRunner.connection.options.database}`];
            await queryRunner.query(`ALTER TABLE ${tableName} CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
