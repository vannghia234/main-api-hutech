import { registerAs } from '@nestjs/config';

export const IoRedisConfig = registerAs('redis', () => ({
  max: +process.env.REDIS_MAX_CLIENT || 100,
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: +process.env.REDIS_PORT || 6379,
  unix_socket: process.env.UNIX_SOCKET,
}));
