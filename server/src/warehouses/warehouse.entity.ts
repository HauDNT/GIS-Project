import { DispatchSlip } from "src/dispatch_slips/dispatch_slip.entity";
import { ReceivingSlip } from "src/receiving_slips/receiving_slip.entity";
import { Staff } from "src/staffs/staff.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("warehouses")
export class Warehouse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    TenKho: string;

    @Column({ type: 'varchar' })
    DiaChi: string;

    @Column({ nullable: true })
    TungDo: number;

    @Column({ nullable: true })
    HoanhDo: number;

    @OneToMany(() => Staff, staff => staff.warehouse)
    staffs: Staff[];

    @OneToMany(() => ReceivingSlip, receivingSlip => receivingSlip.warehouse)
    receivingSlips: ReceivingSlip[];

    @OneToMany(() => DispatchSlip, dispatchSlips => dispatchSlips.warehouse)
    dispatchSlips: DispatchSlip[];
}