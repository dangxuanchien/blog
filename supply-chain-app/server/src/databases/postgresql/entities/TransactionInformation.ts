import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class TransactionInformation extends BaseEntity {
    @PrimaryColumn({ name: 'buyer_company_id' })
    buyerCompanyId: string;

    @PrimaryColumn({ name: 'vendor_company_id' })
    vendorCompanyId: string;

    @PrimaryColumn({name: 'item_id'})
    itemId: string;

    @Column({ name: 'proposed_price', type: 'float', nullable: true })
    proposedPrice: number;

    @Column({ name: 'actual_price', type: 'float', nullable: true })
    actualPrice: number;

    @Column({name: 'original_item_name', type: 'text', nullable: true})
    originalItemName: string;

    @Column({ name: 'order_quantity', type: 'float', nullable: true })
    orderQuantity: number;

    @PrimaryColumn({ name: 'update_date', type: 'timestamp' })
    updateDate: Date;

    @Column({ name: 'update_year' })
    updateYear: Number;
}