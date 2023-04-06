import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { IoRedis } from './ioredis';
import { IoRedisConfig } from './ioredis.config';

@Module({
    imports: [ConfigModule.forFeature(IoRedisConfig)],
    providers: [
        IoRedis,
        {
            provide: 'REDIS_CONNECT_OPTION',
            useFactory: (redisConfig: ConfigType<typeof IoRedisConfig>) => {
                return {
                    maxClient: redisConfig.max,
                    redisOptions: {
                        host: redisConfig.host,
                        port: redisConfig.port,
                    },
                    unixSocket: redisConfig.unix_socket,
                };
            },
            inject: [IoRedisConfig.KEY],
        },
    ],
    exports: [IoRedis],
})
export class IoRedisModule { }
