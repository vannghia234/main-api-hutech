import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { DB } from './connection-name';
import { DBConfig } from './db.config';
import { PostgresModule } from './postgres/postgres.module';

@Module({
  imports: [
    PostgresModule.forRootAsync({
      imports: [
        ConfigModule.forFeature(DBConfig),
      ],
      useFactory: (
        dbConfig: ConfigType<typeof DBConfig>,
      ) => {
        return [
          {
            name: DB,
            database: dbConfig.database,
            host: dbConfig.host,
            port: dbConfig.port,
            user: dbConfig.user,
            password: dbConfig.password,
            application_name: dbConfig.app_name,
          }
        ];
      },
      inject: [DBConfig.KEY],
    }),
  ],
})
export class PersistentModule { }
