import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AbstractBaseEntity } from '../base.entity';
import { Clinic } from './clinic.entity';
import { Review } from './review.entity';

@Entity({ schema: 'core', name: 'doctor' })
export class Doctor extends AbstractBaseEntity {
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
