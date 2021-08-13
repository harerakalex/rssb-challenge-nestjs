import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { FileReader } from './utils/filereader.utils';
import { RedisCache } from '../helpers/redis.helpers';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, FileReader, RedisCache],
})
export class UsersModule {}
