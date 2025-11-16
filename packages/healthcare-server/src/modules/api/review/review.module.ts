import { Module } from '@nestjs/common';
import { ReviewSerive } from './review.service';
import { Review } from '@/database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  providers: [ReviewSerive],
})
export class ReviewModule {}
