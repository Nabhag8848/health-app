import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic } from '@/database/entities';
import { Point, Repository } from 'typeorm';
import { FindNearbyClinicDto } from './dto/find-nearby-clinic.dto';
import { CreateClinicDto } from './dto/create-clinic.dto';

@Injectable()
export class ClinicSerive {
  constructor(
    @InjectRepository(Clinic)
    private readonly clinicRepository: Repository<Clinic>
  ) {}

  async createOneClinic({ name, lat, lng }: CreateClinicDto) {
    const coordinates: Point = {
      type: 'Point',
      coordinates: [lng, lat],
    };

    return this.clinicRepository.save({
      name,
      coordinates,
    });
  }

  async getWithinRange({ lng, lat, radius }: FindNearbyClinicDto) {
    return this.clinicRepository
      .createQueryBuilder('clinic')
      .select()
      .where(
        'ST_DWithin(clinic.coordinates, ST_SetSRID(ST_MakePoint(:lon, :lat), 4326), :range)',
        { lng, lat, range: radius * 1000 }
      )
      .getMany();
  }
}
