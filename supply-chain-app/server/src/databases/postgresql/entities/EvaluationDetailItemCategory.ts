import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { ItemCategoryGroupInformation } from './ItemCategoryGroupInformation';
import { ItemCategoryInformation } from './ItemCategoryInformation';

@Entity()
export class EvaluationDetailItemCategory extends BaseEntity {
  @PrimaryColumn({ name: 'company_id' })
  companyId: string;

  @PrimaryColumn({ name: 'item_category_id', type: 'text' })
  itemCategoryId: string;

  @Column({ name: 'item_category_group_id'})
  itemCategoryGroupId: string;

  @Column({ name: 'relevant_score'})
  relevantScore: string;

  @Column({ name: 'score', type: 'float', nullable: true})
  score: number;

  @PrimaryColumn({ name: 'parameter' })
  parameter: string;

  @Column({ name: 'value', nullable: true, type: 'float' })
  value: number;

  @Column({ name: 'min_value', type: 'float', nullable: true })
  minValue: number;
  
  @Column({ name: 'bottom_25per_value', type: 'float', nullable: true })
  bottom25perValue: number;

  @Column({ name: 'median_value', type: 'float', nullable: true })
  medianValue: number;

  @Column({ name: 'top_25per_value', type: 'float', nullable: true })
  top25perValue: number;

  @Column({ name: 'max_value', type: 'float', nullable: true })
  maxValue: number;

  @PrimaryColumn({ name: 'update_date', type: 'timestamp' })
  updateDate: Date;

  @Column({ name: 'update_year' })
  updateYear: Number;
}
