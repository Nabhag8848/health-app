import { Expose } from 'class-transformer';

export class DoctorDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  yoe: number;
}
