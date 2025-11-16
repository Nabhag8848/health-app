import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  type Point,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Doctor } from './doctor.entity';

@Entity({ schema: 'core', name: 'clinic' })
export class Clinic extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 64,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'geography',
    srid: 4326,
    spatialFeatureType: 'Point',
  })
  coordinates: Point;

  @OneToMany(() => Doctor, (doctor) => doctor.clinic)
  doctors: Doctor[];
}
