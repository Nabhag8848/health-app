import { Expose, Transform, Type } from 'class-transformer';
import { DoctorDto } from '@/modules/api/doctor/dto/doctor.dto';

export class ClinicWithDoctorsDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ value }) => {
    const km = (value as number) / 1000;
    return Math.round(km * 100) / 100;
  })
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
