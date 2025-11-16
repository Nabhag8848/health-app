import {
  BaseEntity,
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Clinic } from './clinic.entity';
import { Review } from './review.entity';

@Entity({ schema: 'core', name: 'doctor' })
export class Doctor extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 64,
    nullable: false,
  })
  name: string;

  @Column()
  @Check(`"yoe" >= 0 AND "yoe" <= 100`)
  yoe: number;

  @ManyToOne(() => Clinic, (clinic) => clinic.doctors)
  @JoinColumn({ name: 'clinicId' })
  clinic: Clinic;

  @OneToMany(() => Review, (review) => review.doctor)
  reviews: Review[];
}
