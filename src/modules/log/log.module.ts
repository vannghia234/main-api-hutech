import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PostgresModule } from '../../lib/persistent/postgres/postgres.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '../cache/cache.module';

import { DB } from '../../lib/persistent/connection-name';
import { AppConfig } from '../../lib/config/app.config';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';
import { EventHandlers } from './events';
import { AssetsProvider } from '../../lib/shared/assets.provider';

import { MyHttpModule } from '../../lib/infra/http/my-http.module';
import { LogRepository } from './repository/log.repository';
import { LogController } from './log.controller';
import { LogSagas } from './log.sagas';
import { LogService } from './log.service';

@Module({
  imports: [
    PostgresModule.forFeature(DB),
    ConfigModule.forFeature(AppConfig),
    CacheModule,
    MyHttpModule,
    CqrsModule,
  ],
  controllers: [LogController],
  providers: [
    AssetsProvider,
    LogRepository,
    LogService,
    ...QueryHandlers,
    ...CommandHandlers,
    ...EventHandlers,
    LogSagas,
  ],
  exports: [
    LogService
  ]
})
export class LogModule { }
