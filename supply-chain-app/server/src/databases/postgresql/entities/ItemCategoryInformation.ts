import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { ItemCategoryGroupInformation } from "./ItemCategoryGroupInformation";
import { ItemInformation } from "./ItemInformation";

@Entity()
export class ItemCategoryInformation extends BaseEntity {
    
    @PrimaryColumn({ name: 'item_category_id' })
    itemCategoryId: string;

    @Column({ name: 'item_category_name' })
    itemCategoryName: string;

    @Column({name: 'item_category_group_id', })
    itemCategoryGroupId: string;
}

