import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as _ from 'lodash';
import { Logger } from '@nestjs/common';
import { LogRepository } from '../repository/log.repository';
import { Log } from '../repository/log.model';

export class GetLogsQuery implements IQuery {
  public readonly key_unit: string;
  public readonly per_page: number;
  public readonly page: number;

  constructor(
    key_unit,
    per_page,
    page,
  ) {
    this.key_unit = key_unit;
    this.per_page = per_page;
    this.page = page;
  }
}

@QueryHandler(GetLogsQuery)
export class GetLogsQueryHandler
  implements IQueryHandler<GetLogsQuery> {

  private readonly logger = new Logger(GetLogsQueryHandler.name);
  constructor(
    private readonly logRepository: LogRepository,
  ) { }

  async execute(
    query: GetLogsQuery,
  ): Promise<any> {
    let limit = query.per_page || 10;
    let offset = 0;
    if (query.page > 1) {
      offset = (query.page - 1) * limit
    }
    this.logger.debug(`GetLogsQueryHandler`);
    let result
    try {
      result = await this.logRepository.getList(query, limit, offset);
    } catch (error) {
      result = []
    }
    return result
  }
}
