import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractBaseEntity } from '../base.entity';
import { Doctor } from './doctor.entity';
import { User } from './user.entity';

@Entity({ schema: 'core', name: 'review' })
export class Review extends AbstractBaseEntity {
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
