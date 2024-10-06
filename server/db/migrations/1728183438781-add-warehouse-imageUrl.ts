import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWarehouseImageUrl1728183438781 implements MigrationInterface {
    name = 'AddWarehouseImageUrl1728183438781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`warehouses\` ADD \`imageUrl\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`warehouses\` DROP COLUMN \`imageUrl\``);
    }

}
