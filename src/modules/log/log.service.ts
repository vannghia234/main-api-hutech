import { Injectable } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ClearLogCommand } from './commands/clear-log.command';
import { GetLogsQuery } from './queries/get-log.query';

@Injectable()
export class LogService {
  constructor(
    // private readonly httpService: HttpService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) { }

  getList(dto) {
    return this.queryBus.execute(new GetLogsQuery(dto.key_unit, dto.per_page, dto.page))
  }

  clear(dto, userId) {
    return this.commandBus.execute(new ClearLogCommand(dto.key_unit))
  }
}
