import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic, Doctor } from '@/database/entities';
import { ClinicController } from './clinic.controller';
import { DoctorService } from '@/modules/api/doctor/doctor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic, Doctor])],
  providers: [ClinicService, DoctorService],
  controllers: [ClinicController],
})
export class ClinicModule {}
