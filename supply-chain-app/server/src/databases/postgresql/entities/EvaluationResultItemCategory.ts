import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { ItemCategoryGroupInformation } from './ItemCategoryGroupInformation';
import { ItemCategoryInformation } from './ItemCategoryInformation';

@Entity()
export class EvaluationResultItemCategory extends BaseEntity {
  @PrimaryColumn({ name: 'company_id' })
  companyId: string;

  @PrimaryColumn({ name: 'item_category_id' })
  itemCategoryId: string;

  @Column({ name: 'item_category_group_id' })
  itemCategoryGroupId: string;

  @Column({ name: 'quality_score', nullable: true, type: 'float' })
  qualityScore: number;

  @Column({ name: 'cost_score', nullable: true, type: 'float' })
  costScore: number;

  @Column({ name: 'delivery_score', nullable: true, type: 'float' })
  deliveryScore: number;

  @Column({ name: 'finance_score', nullable: true, type: 'float' })
  financeScore: number;

  @Column({ name: 'environment_score', nullable: true, type: 'float' })
  environmentScore: number;

  @Column({ name: 'labor_score', nullable: true, type: 'float' })
  laborScore: number;

  @Column({ name: 'ethics_score', nullable: true, type: 'float' })
  ethicsScore: number;

  @Column({ name: 'sustainable_score', nullable: true, type: 'float' })
  sustainableScore: number;

  @PrimaryColumn({ name: 'update_date', type: 'timestamp' })
  updateDate: Date;

  @Column({ name: 'update_year' })
  updateYear: Number;
}
