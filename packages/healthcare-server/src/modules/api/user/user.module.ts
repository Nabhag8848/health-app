import { User } from '@/database/entities';
import { Module } from '@nestjs/common';
import { UserSerive } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserSerive],
})
export class UserModule {}
