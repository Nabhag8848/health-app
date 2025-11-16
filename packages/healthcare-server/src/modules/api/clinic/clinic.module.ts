import { Module } from '@nestjs/common';
import { ClinicSerive } from './clinic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from '@/database/entities';
import { ClinicController } from './clinic.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic])],
  providers: [ClinicSerive],
  controllers: [ClinicController],
})
export class ClinicModule {}
