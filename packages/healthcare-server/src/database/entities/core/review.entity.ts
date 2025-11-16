import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Doctor } from './doctor.entity';

@Entity({ schema: 'core', name: 'review' })
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 1000,
    nullable: false,
  })
  message: string;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Doctor, (doctor) => doctor.reviews)
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;
}
