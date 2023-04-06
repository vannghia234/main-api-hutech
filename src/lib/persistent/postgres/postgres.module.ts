import { DynamicModule, Module } from '@nestjs/common';
import { ConnectionPool } from './connection-pool';
import {
  AsyncConnection,
  Connection,
  CONNECTION_POOL_MAP_PROVIDER,
  DEFAULT,
  PostgreCoreModule,
} from './postgres-core.module';

export function generateConnectionPoolToken(name: string) {
  return `CONNECTION_POOL_${name.toUpperCase()}`;
}

@Module({})
export class PostgresModule {
  public static forRoot(options: Connection[]): DynamicModule {
    return {
      module: PostgresModule,
      imports: [PostgreCoreModule.forRoot(options)],
    };
  }

  public static forRootAsync(options: AsyncConnection): DynamicModule {
    return {
      module: PostgresModule,
      imports: [PostgreCoreModule.forRootAsync(options)],
    };
  }

  public static forFeature(connection: string = DEFAULT): DynamicModule {
    return {
      module: PostgresModule,
      providers: [this.createConnectionPoolProvider(connection)],
      exports: [this.createConnectionPoolProvider(connection)],
    };
  }

  private static createConnectionPoolProvider(connection: string) {
    return {
      provide: generateConnectionPoolToken(connection),
      useFactory: (connPoolMap: Map<string, ConnectionPool>) => {
        if (!connPoolMap.has(connection)) {
          throw new Error(`no connection ${connection} available`);
        }

        return connPoolMap.get(connection);
      },
      inject: [CONNECTION_POOL_MAP_PROVIDER],
    };
  }
}
