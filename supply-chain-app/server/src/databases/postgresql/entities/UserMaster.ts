import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { WeightMaster } from './WeightMaster';
@Entity()
export class UserMaster extends BaseEntity {
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @Column({ name: 'login_id' })
  loginId: string;

  @Column({ name: 'password' })
  password: string;

  @OneToMany(() => WeightMaster, (weightMaster) => weightMaster.user)
  weightMaster: WeightMaster;
}
