import { MigrationInterface, QueryRunner } from "typeorm";

export class RootMigration1726382761170 implements MigrationInterface {
    name = 'RootMigration1726382761170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`riceplants\` CHANGE \`LoaiLua\` \`Type\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dispatch_slips\` CHANGE \`ThoiGianLapDon\` \`CreatedAt\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`receiving_slips\` CHANGE \`ThoiGianLapDon\` \`CreatedAt\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouses\` DROP COLUMN \`TenKho\``);
        await queryRunner.query(`ALTER TABLE \`warehouses\` DROP COLUMN \`DiaChi\``);
        await queryRunner.query(`ALTER TABLE \`warehouses\` DROP COLUMN \`TungDo\``);
        await queryRunner.query(`ALTER TABLE \`warehouses\` DROP COLUMN \`HoanhDo\``);
        await queryRunner.query(`ALTER TABLE \`staffs\` DROP COLUMN \`HoTen\``);
        await queryRunner.query(`ALTER TABLE \`staffs\` DROP COLUMN \`SoDienThoai\``);
        await queryRunner.query(`ALTER TABLE \`staffs\` DROP COLUMN \`MatKhau\``);
        await queryRunner.query(`ALTER TABLE \`staffs\` DROP COLUMN \`GioiTinh\``);
        await queryRunner.query(`ALTER TABLE \`staffs\` DROP COLUMN \`DiaChi\``);
        await queryRunner.query(`ALTER TABLE \`receiving_rice\` DROP COLUMN \`SoLuong\``);
        await queryRunner.query(`ALTER TABLE \`receiving_rice\` DROP COLUMN \`DonGia\``);
        await queryRunner.query(`ALTER TABLE \`dispatch_rice\` DROP COLUMN \`SoLuong\``);
        await queryRunner.query(`ALTER TABLE \`dispatch_rice\` DROP COLUMN \`DonGia\``);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`HoTen\``);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`SoDienThoai\``);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`GioiTinh\``);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`DiaChi\``);
        await queryRunner.query(`ALTER TABLE \`warehouses\` ADD \`Name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouses\` ADD \`Address\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouses\` ADD \`Latitude\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouses\` ADD \`Longitude\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`staffs\` ADD \`Fullname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`staffs\` ADD \`PhoneNumber\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`staffs\` ADD \`Pasword\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`staffs\` ADD \`Gender\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`staffs\` ADD \`Address\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`receiving_rice\` ADD \`Amount\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`receiving_rice\` ADD \`UnitPrice\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dispatch_rice\` ADD \`Amount\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dispatch_rice\` ADD \`UnitPrice\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`Fullname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`PhoneNumber\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`Gender\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`Address\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`riceplants\` DROP COLUMN \`Type\``);
        await queryRunner.query(`ALTER TABLE \`riceplants\` ADD \`Type\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`riceplants\` DROP COLUMN \`Type\``);
        await queryRunner.query(`ALTER TABLE \`riceplants\` ADD \`Type\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`Address\``);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`Gender\``);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`PhoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`Fullname\``);
        await queryRunner.query(`ALTER TABLE \`dispatch_rice\` DROP COLUMN \`UnitPrice\``);
        await queryRunner.query(`ALTER TABLE \`dispatch_rice\` DROP COLUMN \`Amount\``);
        await queryRunner.query(`ALTER TABLE \`receiving_rice\` DROP COLUMN \`UnitPrice\``);
        await queryRunner.query(`ALTER TABLE \`receiving_rice\` DROP COLUMN \`Amount\``);
        await queryRunner.query(`ALTER TABLE \`staffs\` DROP COLUMN \`Address\``);
        await queryRunner.query(`ALTER TABLE \`staffs\` DROP COLUMN \`Gender\``);
        await queryRunner.query(`ALTER TABLE \`staffs\` DROP COLUMN \`Pasword\``);
        await queryRunner.query(`ALTER TABLE \`staffs\` DROP COLUMN \`PhoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`staffs\` DROP COLUMN \`Fullname\``);
        await queryRunner.query(`ALTER TABLE \`warehouses\` DROP COLUMN \`Longitude\``);
        await queryRunner.query(`ALTER TABLE \`warehouses\` DROP COLUMN \`Latitude\``);
        await queryRunner.query(`ALTER TABLE \`warehouses\` DROP COLUMN \`Address\``);
        await queryRunner.query(`ALTER TABLE \`warehouses\` DROP COLUMN \`Name\``);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`DiaChi\` mediumtext CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`GioiTinh\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`SoDienThoai\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`HoTen\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dispatch_rice\` ADD \`DonGia\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dispatch_rice\` ADD \`SoLuong\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`receiving_rice\` ADD \`DonGia\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`receiving_rice\` ADD \`SoLuong\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`staffs\` ADD \`DiaChi\` mediumtext CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`staffs\` ADD \`GioiTinh\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`staffs\` ADD \`MatKhau\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`staffs\` ADD \`SoDienThoai\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`staffs\` ADD \`HoTen\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouses\` ADD \`HoanhDo\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouses\` ADD \`TungDo\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouses\` ADD \`DiaChi\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouses\` ADD \`TenKho\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`receiving_slips\` CHANGE \`CreatedAt\` \`ThoiGianLapDon\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dispatch_slips\` CHANGE \`CreatedAt\` \`ThoiGianLapDon\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`riceplants\` CHANGE \`Type\` \`LoaiLua\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL`);
    }

}
