import { ManyToOne } from 'typeorm';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserMaster } from './UserMaster';

@Entity()
export class WeightMaster extends BaseEntity {

  @ManyToOne(() => UserMaster, (userMaster) => userMaster.userId)
  @JoinColumn({ name: 'user_id' })
  @PrimaryColumn({ name: 'user_id', type: 'text' })
  user: UserMaster;

  @Column({ name: 'quality_weight', type: 'float' })
  qualityWeight: number;

  @Column({ name: 'cost_weight', type: 'float' })
  costWeight: number;

  @Column({ name: 'delivery_weight', type: 'float' })
  deliveryWeight: number;

  @Column({ name: 'finance_weight', type: 'float' })
  financeWeight: number;

  @Column({ name: 'environment_weight', type: 'float' })
  environmentWeight: number;

  @Column({ name: 'labor_weight', type: 'float' })
  laborWeight: number;

  @Column({ name: 'ethics_weight', type: 'float' })
  ethicsWeight: number;

  @Column({ name: 'sustainable_weight', type: 'float' })
  sustainableWeight: number;

  @PrimaryColumn({ name: 'update_date', type: 'timestamp' })
  updateDate: Date;

}
