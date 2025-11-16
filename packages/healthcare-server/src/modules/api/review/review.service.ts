import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from '@/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewSerive {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepoistory: Repository<Review>
  ) {}
}
