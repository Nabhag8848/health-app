import { Body, Controller, Post } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorService } from './doctor.service';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async createOneDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.createOneDoctor(createDoctorDto);
  }
}
