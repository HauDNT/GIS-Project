import { DispatchSlip } from "src/dispatch_slips/dispatch_slip.entity";
import { RicePlant } from "src/riceplants/riceplant.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";


@Entity("dispatch_rice")
export class DispatchRice {
    @PrimaryColumn()
    ID_DispatchSlip: number;

    @PrimaryColumn()
    ID_RicePlant: number;

    @Column()
    SoLuong: number;

    @Column()
    DonGia: number;

    @ManyToOne(() => DispatchSlip, dispatchSlip => dispatchSlip.dispatchRices)
    dispatchSlip: DispatchSlip;

    @OneToOne(() => RicePlant, ricePlant => ricePlant.dispatchRice)
    @JoinColumn({ name: "ID_RicePlant" })
    ricePlant: RicePlant;
}