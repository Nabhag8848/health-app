import { createCursorPaginationResponseDto } from '@/modules/api/common/dtos/cursor-pagination-response.dto';
import { ClinicWithDoctorsDto } from './clinic-with-doctors.dto';

export const ClinicCursorPaginationResponseDto =
  createCursorPaginationResponseDto(ClinicWithDoctorsDto);
