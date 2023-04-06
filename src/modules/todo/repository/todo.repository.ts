import { Injectable } from "@nestjs/common";
import { DB } from "../../../lib/persistent/connection-name";
import { ConnectionPool } from "../../../lib/persistent/postgres/connection-pool";
import { Connection } from "../../../lib/persistent/postgres/connection.decorator";


@Injectable()
export class TodoRepository {
  constructor(
    @Connection(DB) private readonly pg: ConnectionPool,
  ) { }

  async getList(): Promise<any[]> {
    let queryText = `
      SELECT
        id,
        content,
        time_create,
        time_update,
        checked
      FROM docker_todo
      ORDER BY time_create ASC
    `
    let params = [];
    return this.pg.excute(queryText, params).then((result) => {
      return result.rows
    });
  }

  async create(option): Promise<any> {
    let queryText = `
      INSERT INTO docker_todo (
        time_create,
        time_update,
        content,
        checked
      ) VALUES (
        current_timestamp,
        current_timestamp,
        $1,
        $2
      ) RETURNING id
    `
    let params = [
      option.content,
      option.checked
    ];
    return this.pg.excute(queryText, params).then((result) => {
      return result.rows[0]
    });
  }

  async update(option): Promise<any> {
    let queryText = `
      UPDATE docker_todo 
      SET content = $2,
      checked = $3,
      time_update = current_timestamp
      WHERE id = $1
    `
    let params = [
      option.id,
      option.content,
      option.checked,
    ];
    return this.pg.excute(queryText, params)
  }

  async delete(option): Promise<any> {
    let queryText = `
      DELETE FROM docker_todo 
      WHERE id = $1
    `
    let params = [option.id];
    return this.pg.excute(queryText, params)
  }
}
