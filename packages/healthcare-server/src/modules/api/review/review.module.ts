import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from '@/database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  providers: [ReviewService],
})
export class ReviewModule {}
