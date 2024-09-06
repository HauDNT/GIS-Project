import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "src/customers/customer.entity";
import { Staff } from "src/staffs/staff.entity";
import { Warehouse } from "src/warehouses/warehouse.entity";
import { ReceivingRice } from "src/receiving_rices/receiving_rice.entity";

@Entity("receiving_slips")
export class ReceivingSlip {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ID_Warehouse: number;

    @Column()
    ID_Customer: number;

    @Column()
    ID_Staff: number;

    @Column("datetime") 
    ThoiGianLapDon: Date;

    @ManyToOne(() => Customer, customer => customer.receivingSlips)
    @JoinColumn({ name: "ID_Customer" })
    customer: Customer;

    @ManyToOne(() => Staff, staff => staff.receivingSlips)
    @JoinColumn({ name: "ID_Staff" })
    staff: Staff;

    @ManyToOne(() => Warehouse, warehouse => warehouse.receivingSlips)
    @JoinColumn({ name: "ID_Warehouse" })
    warehouse: Warehouse;

    @OneToMany(() => ReceivingRice, receiveRices => receiveRices.receiveSlip)
    receiveRices: ReceivingRice[];
}