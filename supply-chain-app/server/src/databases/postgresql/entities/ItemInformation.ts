import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ItemCategoryInformation } from './ItemCategoryInformation';

@Entity()
export class ItemInformation extends BaseEntity {
  @PrimaryColumn({ name: 'item_id' })
  itemId: string;

  @Column({ name: 'item_name' })
  itemName: string;

  @Column({ name: 'item_category_id' })
  itemCategoryId: string;

  @Column({ name: 'original_item_name' })
  originalItemName: string;

  @PrimaryColumn({ name: 'update_date', type: 'timestamp' })
  updateDate: Date;

  @Column({ name: 'update_year' })
  updateYear: Number;

  @PrimaryColumn({ name: 'company_id'})
  companyId: string;

  @ManyToOne(() => ItemCategoryInformation)
  @JoinColumn({ name: 'item_category_id' })
  itemCategoryInformation: ItemCategoryInformation;
}
