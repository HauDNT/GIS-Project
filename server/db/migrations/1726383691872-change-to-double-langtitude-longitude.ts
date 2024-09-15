import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeToDoubleLangtitudeLongitude1726383691872 implements MigrationInterface {
    name = 'ChangeToDoubleLangtitudeLongitude1726383691872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`warehouses\` CHANGE \`Latitude\` \`Latitude\` double(25,20) NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouses\` CHANGE \`Longitude\` \`Longitude\` double(25,20) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`warehouses\` CHANGE \`Longitude\` \`Longitude\` double(15,10) NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouses\` CHANGE \`Latitude\` \`Latitude\` double(15,10) NULL`);
    }

}
