import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic } from '@/database/entities';
import { Point, Repository } from 'typeorm';
import { FindNearbyClinicDto } from './dto/find-nearby-clinic.dto';
import { CreateClinicDto } from './dto/create-clinic.dto';
import encodeCursor from '@/modules/api/common/utils/encode-cursor.util';

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Clinic)
    private readonly clinicRepository: Repository<Clinic>
  ) {}

  async createOneClinic({ name, lat, lng }: CreateClinicDto) {
    const coordinates: Point = {
      type: 'Point',
      coordinates: [lng, lat],
    };

    return this.clinicRepository.save({
      name,
      coordinates,
    });
  }

  async getWithinRange({
    lng,
    lat,
    radius,
    cursor,
    limit = 10,
  }: FindNearbyClinicDto) {
    let cursorData: { distance: number; id: string } | null = null;
    const distanceExpr =
      'ST_Distance(clinic.coordinates, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326))';

    if (cursor) {
      try {
        cursorData = JSON.parse(
          Buffer.from(cursor, 'base64').toString('utf-8')
        );
      } catch {
        cursorData = null;
        throw new BadRequestException('Invalid cursor');
      }
    }

    const queryBuilder = this.clinicRepository
      .createQueryBuilder('clinic')
      .leftJoinAndSelect('clinic.doctors', 'doctor')
      .addSelect(distanceExpr, 'distance')
      .where(
        'ST_DWithin(clinic.coordinates, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326), :range)',
        { lng, lat, range: radius * 1000 }
      )
      .orderBy('distance', 'ASC')
      .limit(limit + 1);

    if (cursorData) {
      const { distance: cursorDistance, id: cursorId } = cursorData;

      if (cursorDistance !== undefined && cursorId) {
        queryBuilder.andWhere(
          `(${distanceExpr} > :cursorDistance OR (${distanceExpr} = :cursorDistance AND clinic.id > :cursorId))`,
          { cursorDistance, cursorId, lng, lat }
        );
      }
    }

    const { entities, raw } = await queryBuilder.getRawAndEntities();

    // Check if there's a next page
    const hasNextPage = entities.length > limit;
    const clinicsData = entities.slice(0, limit).map((clinic, index) => ({
      ...clinic,
      distance: raw[index]?.distance,
    }));

    const clinicsFirstItem = clinicsData[0];
    const clinicsLastItem = clinicsData[clinicsData.length - 1];

    // Generate current page cursor (first item of current page)
    const currentCursor =
      clinicsData.length > 0
        ? encodeCursor(clinicsFirstItem.distance, clinicsFirstItem.id)
        : null;

    // Generate next page cursor (last item of current page, if next page exists)
    const nextPageCursor =
      hasNextPage && clinicsData.length > 0
        ? encodeCursor(clinicsLastItem.distance, clinicsLastItem.id)
        : null;

    return {
      cursor: currentCursor,
      nextPage: nextPageCursor,
      data: clinicsData,
    };
  }
}
