import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserSerive {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
}
