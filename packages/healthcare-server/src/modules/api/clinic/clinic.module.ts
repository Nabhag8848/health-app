import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from '@/database/entities';
import { ClinicController } from './clinic.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic])],
  providers: [ClinicService],
  controllers: [ClinicController],
})
export class ClinicModule {}
