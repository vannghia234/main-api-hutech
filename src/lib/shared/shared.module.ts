import { Global, Module } from '@nestjs/common';
import { IoRedisModule } from '../persistent/ioredis/ioredis.module';
import { AssetsProvider } from './assets.provider';

@Global()
@Module({
  imports: [IoRedisModule],
  providers: [AssetsProvider],
  exports: [AssetsProvider],
})
export class SharedModule { }
