import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { ItemCategoryInformation } from './ItemCategoryInformation';

@Entity()
export class ItemCategoryGroupInformation extends BaseEntity {
  @PrimaryColumn({ name: 'item_category_group_id' })
  itemCategoryGroupId: string;

  @Column({ name: 'item_category_group_name' })
  itemCategoryGroupName: string;
}
