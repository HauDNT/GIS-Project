import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSoftDeleteEntityWarehouses1727768826595 implements MigrationInterface {
    name = 'AddSoftDeleteEntityWarehouses1727768826595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`warehouses\` ADD \`isDeleted\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`staffs\` DROP COLUMN \`Address\``);
        await queryRunner.query(`ALTER TABLE \`staffs\` ADD \`Address\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`Address\``);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`Address\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`Address\``);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`Address\` mediumtext CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`staffs\` DROP COLUMN \`Address\``);
        await queryRunner.query(`ALTER TABLE \`staffs\` ADD \`Address\` mediumtext CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouses\` DROP COLUMN \`isDeleted\``);
    }

}
