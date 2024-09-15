import { DispatchSlip } from "src/dispatch_slips/dispatch_slip.entity";
import { ReceivingSlip } from "src/receiving_slips/receiving_slip.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("customers")
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Fullname: string;

    @Column()
    Email: string;

    @Column()
    PhoneNumber: number;

    @Column()
    Gender: boolean;

    @Column("text")
    Address: string;

    @OneToMany(() => DispatchSlip, dispatchSlips => dispatchSlips.customer)
    dispatchSlips: DispatchSlip[];

    @OneToMany(() => ReceivingSlip, receivingSlips => receivingSlips.customer)
    receivingSlips: ReceivingSlip[];
}