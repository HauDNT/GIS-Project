import { MigrationInterface, QueryRunner } from "typeorm";

export class RootDatabase1725870250011 implements MigrationInterface {
    name = 'RootDatabase1725870250011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`staffs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`HoTen\` varchar(255) NOT NULL, \`Email\` varchar(255) NOT NULL, \`SoDienThoai\` varchar(255) NOT NULL, \`MatKhau\` varchar(255) NOT NULL, \`GioiTinh\` tinyint NOT NULL, \`DiaChi\` text NOT NULL, \`warehouseId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dispatch_rice\` (\`ID_DispatchSlip\` int NOT NULL, \`ID_RicePlant\` int NOT NULL, \`SoLuong\` int NOT NULL, \`DonGia\` int NOT NULL, \`dispatchSlipId\` int NULL, PRIMARY KEY (\`ID_DispatchSlip\`, \`ID_RicePlant\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`riceplants\` (\`id\` int NOT NULL AUTO_INCREMENT, \`LoaiLua\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`receiving_rice\` (\`ID_DispatchSlip\` int NOT NULL, \`ID_RicePlant\` int NOT NULL, \`SoLuong\` int NOT NULL, \`DonGia\` int NOT NULL, \`receiveSlipId\` int NULL, PRIMARY KEY (\`ID_DispatchSlip\`, \`ID_RicePlant\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`receiving_slips\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ID_Warehouse\` int NOT NULL, \`ID_Customer\` int NOT NULL, \`ID_Staff\` int NOT NULL, \`ThoiGianLapDon\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`HoTen\` varchar(255) NOT NULL, \`Email\` varchar(255) NOT NULL, \`SoDienThoai\` int NOT NULL, \`GioiTinh\` tinyint NOT NULL, \`DiaChi\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dispatch_slips\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ID_Warehouse\` int NOT NULL, \`ID_Customer\` int NOT NULL, \`ID_Staff\` int NOT NULL, \`ThoiGianLapDon\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`warehouses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`TenKho\` varchar(255) NOT NULL, \`DiaChi\` text NOT NULL, \`TungDo\` int NULL, \`HoanhDo\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`staffs\` ADD CONSTRAINT \`FK_f0fc53df806b23ee63fd926dec0\` FOREIGN KEY (\`warehouseId\`) REFERENCES \`warehouses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dispatch_rice\` ADD CONSTRAINT \`FK_713388e594fc92f6633b7b609b7\` FOREIGN KEY (\`dispatchSlipId\`) REFERENCES \`dispatch_slips\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dispatch_rice\` ADD CONSTRAINT \`FK_1995f8be0a1ed77967616224655\` FOREIGN KEY (\`ID_RicePlant\`) REFERENCES \`riceplants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receiving_rice\` ADD CONSTRAINT \`FK_9d9ded7fefbdc6744876fa5abee\` FOREIGN KEY (\`receiveSlipId\`) REFERENCES \`receiving_slips\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receiving_rice\` ADD CONSTRAINT \`FK_574c514c09984cd92ec0e04787f\` FOREIGN KEY (\`ID_RicePlant\`) REFERENCES \`riceplants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receiving_slips\` ADD CONSTRAINT \`FK_6d975a77cedfbbd2544c9fdfbce\` FOREIGN KEY (\`ID_Customer\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receiving_slips\` ADD CONSTRAINT \`FK_cbed3fd27cd8fb240041b14885c\` FOREIGN KEY (\`ID_Staff\`) REFERENCES \`staffs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`receiving_slips\` ADD CONSTRAINT \`FK_563adb243ba567cbd4d4dcb893c\` FOREIGN KEY (\`ID_Warehouse\`) REFERENCES \`warehouses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dispatch_slips\` ADD CONSTRAINT \`FK_3b3fbd68b64a5b2c11790084920\` FOREIGN KEY (\`ID_Customer\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dispatch_slips\` ADD CONSTRAINT \`FK_d308786eaf60e963d0b92899322\` FOREIGN KEY (\`ID_Staff\`) REFERENCES \`staffs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dispatch_slips\` ADD CONSTRAINT \`FK_70a799c08d9634440590ff3d12f\` FOREIGN KEY (\`ID_Warehouse\`) REFERENCES \`warehouses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dispatch_slips\` DROP FOREIGN KEY \`FK_70a799c08d9634440590ff3d12f\``);
        await queryRunner.query(`ALTER TABLE \`dispatch_slips\` DROP FOREIGN KEY \`FK_d308786eaf60e963d0b92899322\``);
        await queryRunner.query(`ALTER TABLE \`dispatch_slips\` DROP FOREIGN KEY \`FK_3b3fbd68b64a5b2c11790084920\``);
        await queryRunner.query(`ALTER TABLE \`receiving_slips\` DROP FOREIGN KEY \`FK_563adb243ba567cbd4d4dcb893c\``);
        await queryRunner.query(`ALTER TABLE \`receiving_slips\` DROP FOREIGN KEY \`FK_cbed3fd27cd8fb240041b14885c\``);
        await queryRunner.query(`ALTER TABLE \`receiving_slips\` DROP FOREIGN KEY \`FK_6d975a77cedfbbd2544c9fdfbce\``);
        await queryRunner.query(`ALTER TABLE \`receiving_rice\` DROP FOREIGN KEY \`FK_574c514c09984cd92ec0e04787f\``);
        await queryRunner.query(`ALTER TABLE \`receiving_rice\` DROP FOREIGN KEY \`FK_9d9ded7fefbdc6744876fa5abee\``);
        await queryRunner.query(`ALTER TABLE \`dispatch_rice\` DROP FOREIGN KEY \`FK_1995f8be0a1ed77967616224655\``);
        await queryRunner.query(`ALTER TABLE \`dispatch_rice\` DROP FOREIGN KEY \`FK_713388e594fc92f6633b7b609b7\``);
        await queryRunner.query(`ALTER TABLE \`staffs\` DROP FOREIGN KEY \`FK_f0fc53df806b23ee63fd926dec0\``);
        await queryRunner.query(`DROP TABLE \`warehouses\``);
        await queryRunner.query(`DROP TABLE \`dispatch_slips\``);
        await queryRunner.query(`DROP TABLE \`customers\``);
        await queryRunner.query(`DROP TABLE \`receiving_slips\``);
        await queryRunner.query(`DROP TABLE \`receiving_rice\``);
        await queryRunner.query(`DROP TABLE \`riceplants\``);
        await queryRunner.query(`DROP TABLE \`dispatch_rice\``);
        await queryRunner.query(`DROP TABLE \`staffs\``);
    }

}
