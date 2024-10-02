import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeletedTimestampWarehouseEntity1727838284676 implements MigrationInterface {
    name = 'AddDeletedTimestampWarehouseEntity1727838284676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`warehouses\` ADD \`deletedAt\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`warehouses\` DROP COLUMN \`deletedAt\``);
    }

}
