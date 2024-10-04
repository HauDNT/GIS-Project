import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeletedTimestampAndIsDeletedStaffEntity1727861123286 implements MigrationInterface {
    name = 'AddDeletedTimestampAndIsDeletedStaffEntity1727861123286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`staffs\` ADD \`isDeleted\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`staffs\` ADD \`deletedAt\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`staffs\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`staffs\` DROP COLUMN \`isDeleted\``);
    }

}
