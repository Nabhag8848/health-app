import { ClinicSerive } from './clinic.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { FindNearbyClinicDto } from './dto/find-nearby-clinic.dto';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicSerive) {}

  @Post()
  async createOneClinic(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicService.createOneClinic(createClinicDto);
  }

  @Get('nearby')
  async getWithinRange(@Query() findNearbyClinicDto: FindNearbyClinicDto) {
    return this.clinicService.getWithinRange(findNearbyClinicDto);
  }
}
