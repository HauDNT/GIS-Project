import { DispatchSlip } from "src/dispatch_slips/dispatch_slip.entity";
import { ReceivingSlip } from "src/receiving_slips/receiving_slip.entity";
import { Warehouse } from "src/warehouses/warehouse.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("staffs")
export class Staff {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Fullname: string;

    @Column()
    Email: string;

    @Column()
    PhoneNumber: string;

    @Column()
    Pasword: string;

    @Column()
    Gender: boolean;

    @Column("text")
    Address: string;
    
    @ManyToOne(() => Warehouse, warehouse => warehouse.staffs)
    warehouse: Warehouse;
    
    @OneToMany(() => DispatchSlip, dispatchSlips => dispatchSlips.customer)
    dispatchSlips: DispatchSlip[];

    @OneToMany(() => ReceivingSlip, receivingSlips => receivingSlips.customer)
    receivingSlips: ReceivingSlip[];
}