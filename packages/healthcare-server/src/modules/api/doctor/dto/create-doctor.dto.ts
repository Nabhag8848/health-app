import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { MaxLength } from 'class-validator';
import { Min } from 'class-validator';
import { Max } from 'class-validator';
import { IsNumber } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  yoe: number;

  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  clinicId: string;
}
