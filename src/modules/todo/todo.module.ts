import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from '../../lib/persistent/postgres/postgres.module';
import { CacheModule } from '../cache/cache.module';

import { DB } from '../../lib/persistent/connection-name';
import { AppConfig } from '../../lib/config/app.config';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';
import { EventHandlers } from './events';
import { AssetsProvider } from '../../lib/shared/assets.provider';

import { TodoProxy } from './proxy/todo.proxy';
import { MyHttpModule } from '../../lib/infra/http/my-http.module';
import { TodoRepository } from './repository/todo.repository';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoSagas } from './todo.sagas';

@Module({
  imports: [
    PostgresModule.forFeature(DB),
    ConfigModule.forFeature(AppConfig),
    CacheModule,
    MyHttpModule,
    CqrsModule,
  ],
  controllers: [TodoController],
  providers: [
    AssetsProvider,
    TodoRepository,
    TodoService,
    TodoProxy,
    ...QueryHandlers,
    ...CommandHandlers,
    ...EventHandlers,
    TodoSagas,
  ],
  exports: [
    TodoService,
  ]
})
export class TodoModule { }
