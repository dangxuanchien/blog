import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { BusinessTypeInfomation } from './BusinessTypeInfomation';

@Entity()
export class CompanyInformation extends BaseEntity {
  @PrimaryColumn({ name: 'company_id' })
  companyId: string;

  @PrimaryColumn({ name: 'business_type_id' })
  businessTypeId: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ name: 'headquarters_location', nullable: true })
  headquartersLocation: string;

  @Column({ name: 'location_area', nullable: true })
  locationArea: string;

  @Column({ name: 'capital', nullable: true })
  capital: number;

  @Column({ name: 'regular_customer', nullable: true })
  regularCustomer: string;

  @Column({ name: 'establishment_year', nullable: true })
  establishmentYear: number;

  @Column({ name: 'number_of_employees', nullable: true })
  numberOfEmployees: number;

  @Column({ name: 'representative', nullable: true })
  representative: string;

  @Column({ name: 'sales', nullable: true })
  sales: number;

  @Column({ name: 'operating_profit' })
  operatingProfit: number;

  @Column({ name: 'capital_ratio', nullable: true, type: 'float' })
  capitalRatio: number;

  @Column({ name: 'company_introduction', nullable: true })
  companyIntroduction: string;

  @Column({ name: 'hp_link', nullable: true })
  hpLink: string;

  @Column({ name: 'image_path', nullable: true })
  imagePath: string;

  @Column({ name: 'staff_message', nullable: true })
  staffMessage: string;

  @PrimaryColumn({ name: 'update_date', type: 'timestamp' })
  @Column({ name: 'update_date' })
  updateDate: Date;

  @Column({ name: 'update_year' })
  updateYear: Number;

}
