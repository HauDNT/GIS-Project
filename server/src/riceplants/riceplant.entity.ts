import { DispatchRice } from "src/dispatch_rices/dispatch_rice.entity";
import { ReceivingRice } from "src/receiving_rices/receiving_rice.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("riceplants")
export class RicePlant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    LoaiLua: string;

    @OneToOne(() => ReceivingRice, receiveRice => receiveRice.ricePlant)
    receiveRice: ReceivingRice;

    @OneToOne(() => DispatchRice, dispatchRice => dispatchRice.ricePlant)
    dispatchRice: DispatchRice;
}