import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorService } from './doctor.service';
import { Clinic, Doctor } from '@/database/entities';
import { DoctorController } from './doctor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Clinic])],
  providers: [DoctorService],
  controllers: [DoctorController],
})
export class DoctorModule {}
