import { ClinicService } from './clinic.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { FindNearbyClinicDto } from './dto/find-nearby-clinic.dto';
import { DoctorService } from '@/modules/api/doctor/doctor.service';
import { CreateDoctorDto } from '@/modules/api/doctor/dto/create-doctor.dto';

@Controller('clinic')
export class ClinicController {
  constructor(
    private readonly clinicService: ClinicService,
    private readonly doctorService: DoctorService
  ) {}

  @Post()
  async createOneClinic(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicService.createOneClinic(createClinicDto);
  }

  @Get('nearby')
  async getWithinRange(@Query() findNearbyClinicDto: FindNearbyClinicDto) {
    return this.clinicService.getWithinRange(findNearbyClinicDto);
  }

  @Post(':clinicId/doctor')
  async createOneDoctor(
    @Param('clinicId') clinicId: string,
    @Body() createDoctorDto: CreateDoctorDto
  ) {
    return this.doctorService.createOneDoctor(createDoctorDto, clinicId);
  }
}
