import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic, Doctor } from '@/database/entities';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Clinic)
    private readonly clinicRepository: Repository<Clinic>
  ) {}

  async createOneDoctor({ name, yoe }: CreateDoctorDto, clinicId: string) {
    const clinic = await this.clinicRepository.exists({
      where: { id: clinicId },
    });

    if (!clinic) {
      throw new NotFoundException('Clinic not found');
    }

    return this.doctorRepository.save({
      name,
      yoe,
      clinic: { id: clinicId },
    });
  }
}
