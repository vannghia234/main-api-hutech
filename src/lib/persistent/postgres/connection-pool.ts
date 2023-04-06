import { Injectable, Logger } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';

@Injectable()
export class ConnectionPool {
  private readonly logger = new Logger(ConnectionPool.name);
  constructor(public readonly pool: Pool) {
    // the pool will emit an error on behalf of any idle clients
    // it contains if a backend error or network partition happens
    pool.on('error', (err, client) => {
      this.logger.error(`Unexpected error on idle client. ${err.message}`);
    });
  }

  public excute(query: string, params: any[] = []) {
    return this.pool.query(query, params);
  }

  public async transaction<T = any>(
    callback: (client: PoolClient) => Promise<T>,
  ) {
    const client = await this.pool.connect();
    try {
      await client.query('begin');
      const result = await callback(client);
      await client.query('commit');
      return result;
    } catch (error) {
      await client.query('rollback');
      throw error;
    } finally {
      client.release();
    }
  }
}

const logger = new Logger(ConnectionPool.name);
const Query = require('pg').Query;
const submit = Query.prototype.submit;
Query.prototype.submit = function(...args: any) {
  const text = this.text;
  const values = this.values || [];
  const query = text.replace(/\$([0-9]+)/g, (m, v) =>
    JSON.stringify(values[parseInt(v) - 1]),
  );
  // logger.debug(query);
  submit.apply(this, args);
};
