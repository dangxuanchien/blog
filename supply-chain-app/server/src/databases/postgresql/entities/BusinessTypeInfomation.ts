import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class BusinessTypeInfomation extends BaseEntity {
  @PrimaryColumn({ name: 'business_type_id'})
  businessTypeId: string;

  @Column({ name: 'business_type_name' })
  businessTypeName: string;
}
