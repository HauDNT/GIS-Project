import { ReceivingSlip } from "src/receiving_slips/receiving_slip.entity";
import { RicePlant } from "src/riceplants/riceplant.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";


@Entity("receiving_rice")
export class ReceivingRice {
    @PrimaryColumn()
    ID_DispatchSlip: number;

    @PrimaryColumn()
    ID_RicePlant: number;

    @Column()
    SoLuong: number;

    @Column()
    DonGia: number;

    @ManyToOne(() => ReceivingSlip, receiveSlip => receiveSlip.receiveRices)
    receiveSlip: ReceivingSlip;

    @OneToOne(() => RicePlant, ricePlant => ricePlant.receiveRice)
    @JoinColumn({ name: "ID_RicePlant" })
    ricePlant: RicePlant;
}