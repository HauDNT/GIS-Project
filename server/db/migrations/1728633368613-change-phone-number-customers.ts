import { MigrationInterface, QueryRunner } from "typeorm";

export class RootMigration1728633368613 implements MigrationInterface {
    name = 'RootMigration1728633368613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`PhoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`PhoneNumber\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`PhoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`PhoneNumber\` int NOT NULL`);
    }

}
