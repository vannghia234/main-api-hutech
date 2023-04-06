import { DynamicModule, Global, Module } from '@nestjs/common';
import { Pool, PoolConfig } from 'pg';
import { ConnectionPool } from './connection-pool';

export interface Connection extends PoolConfig {
  name?: string;
}

export interface AsyncConnection {
  imports?: any[];
  useFactory: (...params: any[]) => Connection[];
  inject?: any[];
}

export const POSTGRES_MODULE_OPTIONS = Symbol('postgres-module-options');
export const CONNECTION_POOL_MAP_PROVIDER = Symbol(
  'connection-pool-map-provider',
);

export const DEFAULT = 'default';

@Global()
@Module({})
export class PostgreCoreModule {
  public static forRoot(options: Connection[]): DynamicModule {
    return {
      module: PostgreCoreModule,
      providers: [...this.createProvider(options)],
      exports: [...this.createProvider(options)],
    };
  }

  public static forRootAsync(options: AsyncConnection): DynamicModule {
    return {
      module: PostgreCoreModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProvider(options)],
      exports: [...this.createAsyncProvider(options)],
    };
  }

  private static createProvider(options: Connection[]) {
    return [
      {
        provide: POSTGRES_MODULE_OPTIONS,
        useValue: options || [],
      },
      {
        provide: CONNECTION_POOL_MAP_PROVIDER,
        useFactory: (options: Connection[]) => {
          const CONNECTION_POOL_MAP = new Map<string, ConnectionPool>();
          for (const conn of options) {
            CONNECTION_POOL_MAP.set(
              conn.name || DEFAULT,
              new ConnectionPool(new Pool(conn)),
            );
          }

          return CONNECTION_POOL_MAP;
        },
        inject: [POSTGRES_MODULE_OPTIONS],
      },
    ];
  }

  private static createAsyncProvider(options: AsyncConnection) {
    return [
      {
        provide: POSTGRES_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      },
      {
        provide: CONNECTION_POOL_MAP_PROVIDER,
        useFactory: (options: Connection[]) => {
          const CONNECTION_POOL_MAP = new Map<string, ConnectionPool>();
          for (const conn of options) {
            CONNECTION_POOL_MAP.set(
              conn.name || DEFAULT,
              new ConnectionPool(new Pool(conn)),
            );
          }

          return CONNECTION_POOL_MAP;
        },
        inject: [POSTGRES_MODULE_OPTIONS],
      },
    ];
  }
}
