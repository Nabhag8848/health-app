import { Module } from '@nestjs/common';
import { ClinicSerive } from './clinic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from '@/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic])],
  providers: [ClinicSerive],
})
export class ClinicModule {}
