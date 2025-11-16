import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from './review.entity';

@Entity({ schema: 'core', name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 64,
    nullable: false,
  })
  name: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
