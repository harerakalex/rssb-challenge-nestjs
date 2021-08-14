import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisCache {
  private readonly cacheExpireTime = 3600;
  constructor(private readonly redisService: RedisService) {}

  client(): Redis {
    const client = this.redisService.getClient();
    return client;
  }

  async save<T>(key: string, value: T) {
    return await this.client().setex(key, this.cacheExpireTime, JSON.stringify(value));
  }

  async fetch(key: string) {
    const data = await this.client().get(key);
    return JSON.parse(data);
  }

  async empty() {
    return await this.client().flushall();
  }
}

export default RedisCache;
