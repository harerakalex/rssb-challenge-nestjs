import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import config from '../ormconfig';
import redisConfig from './config/redis.config';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(config), RedisModule.register(redisConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
