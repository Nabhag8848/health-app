import {
  IsNumber,
  IsPositive,
  Max,
  Min,
  IsOptional,
  IsString,
  IsInt,
} from 'class-validator';
import { Transform } from 'class-transformer';
export class FindNearbyClinicDto {
  @IsNumber()
  @IsPositive()
  @Transform((obj) => parseFloat(obj.value))
  radius: number;

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

  @IsOptional()
  @IsString()
  cursor?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Max(100)
  limit = 10;
}
