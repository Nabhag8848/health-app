import { Column, Entity, OneToMany, type Point } from 'typeorm';
import { AbstractBaseEntity } from '../base.entity';
import { Doctor } from './doctor.entity';

@Entity({ schema: 'core', name: 'clinic' })
export class Clinic extends AbstractBaseEntity {
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
