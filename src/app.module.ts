import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ScheduleModule } from '@nestjs/schedule';
import { SharedModule } from './lib/shared/shared.module';
import { PersistentModule } from './lib/persistent/persistent.module';

import { DBConfig, DbValidationSchema } from './lib/persistent/db.config';
import { IoRedisConfig } from './lib/persistent/ioredis/ioredis.config';
import { AppConfig, AppConfigValidationSchema } from './lib/config/app.config';
import { UserConfigValidationSchema } from './lib/config/user.config';

import { TodoModule } from './modules/todo/todo.module';
import { LogModule } from './modules/log/log.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig, IoRedisConfig, DBConfig],
      validationSchema: Joi.object({
        ...DbValidationSchema,
        ...AppConfigValidationSchema,
        ...UserConfigValidationSchema,
      }),
    }),
    ScheduleModule.forRoot(),
    SharedModule,
    CqrsModule,
    PersistentModule,
    LogModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
