import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRiceplantEntity1728696660743 implements MigrationInterface {
    name = 'UpdateRiceplantEntity1728696660743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`riceplants\` DROP COLUMN \`Type\``);
        await queryRunner.query(`ALTER TABLE \`riceplants\` ADD \`Name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`riceplants\` ADD \`imageUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`riceplants\` ADD \`isDeleted\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`riceplants\` ADD \`deletedAt\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`riceplants\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`riceplants\` DROP COLUMN \`isDeleted\``);
        await queryRunner.query(`ALTER TABLE \`riceplants\` DROP COLUMN \`imageUrl\``);
        await queryRunner.query(`ALTER TABLE \`riceplants\` DROP COLUMN \`Name\``);
        await queryRunner.query(`ALTER TABLE \`riceplants\` ADD \`Type\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
    }

}
