import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis'
import { ClientOpts } from 'redis';


interface RedisConnectOption {
  redisOptions: ClientOpts;
  maxClient: number;
  unixSocket: string;
}

@Injectable()
export class IoRedis {
  private redis: Redis.Redis;

  constructor(
    @Inject('REDIS_CONNECT_OPTION')
    private readonly redisConnectOptions: RedisConnectOption,
  ) {
    this.redis = new Redis({
      port: this.redisConnectOptions.redisOptions.port, // Redis port
      host: this.redisConnectOptions.redisOptions.host, // Redis host
      family: 4, // 4 (IPv4) or 6 (IPv6)
      password: "",
      db: 13,
    });
    console.log(redisConnectOptions.redisOptions)
    console.log("INIT IO REDIS")
  }

  /**
   * Mượn redis client từ pool
   */
  public get getRedis() {
    return this.redis
  }
}
