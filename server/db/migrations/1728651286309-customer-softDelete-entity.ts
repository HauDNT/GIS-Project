import { MigrationInterface, QueryRunner } from "typeorm";

export class CustomerSoftDeleteEntity1728651286309 implements MigrationInterface {
    name = 'CustomerSoftDeleteEntity1728651286309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`isDeleted\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`deletedAt\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`isDeleted\``);
    }

}
