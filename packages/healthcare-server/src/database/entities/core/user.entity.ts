import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractBaseEntity } from '../base.entity';
import { Review } from './review.entity';

@Entity({ schema: 'core', name: 'user' })
export class User extends AbstractBaseEntity {
  @Column({
    length: 64,
    nullable: false,
  })
  name: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
