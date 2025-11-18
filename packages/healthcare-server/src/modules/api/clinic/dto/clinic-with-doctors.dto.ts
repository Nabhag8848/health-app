import { Expose, Type } from 'class-transformer';
import { DoctorDto } from '@/modules/api/doctor/dto/doctor.dto';

export class ClinicWithDoctorsDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  distance: number;

  @Expose()
  coordinates: {
    type: 'Point';
    coordinates: [number, number];
  };

  @Expose()
  @Type(() => DoctorDto)
  doctors: DoctorDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
