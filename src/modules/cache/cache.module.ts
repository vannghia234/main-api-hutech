import { Module } from '@nestjs/common';
// import { CacheRoomUserService } from './_room-user.service';
import { CacheTodoService } from './cache-todo.service';
import { IoRedisModule } from '../../lib/persistent/ioredis/ioredis.module';

@Module({
  imports: [
    IoRedisModule,
  ],
  controllers: [],
  providers: [
    CacheTodoService,
  ],
  exports: [
    CacheTodoService,
  ],
})
export class CacheModule { }
