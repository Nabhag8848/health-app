import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorService } from './doctor.service';
import { Clinic, Doctor } from '@/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Clinic])],
  providers: [DoctorService],
})
export class DoctorModule {}
