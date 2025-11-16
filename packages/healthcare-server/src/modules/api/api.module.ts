import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { DoctorModule } from './doctor/doctor.module';
import { ClinicModule } from './clinic/clinic.module';

@Module({
  imports: [UserModule, ReviewModule, DoctorModule, ClinicModule],
})
export class APIModule {}
