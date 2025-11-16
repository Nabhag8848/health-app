import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateClinicDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name: string;

  @IsNumber()
  @Min(-180)
  @Max(180)
  @Transform((obj) => parseFloat(obj.value))
  lng: number;

  @IsNumber()
  @Min(-90)
  @Max(90)
  @Transform((obj) => parseFloat(obj.value))
  lat: number;
}
