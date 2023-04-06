import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class AppDebug {
  private readonly logger = new Logger(AppDebug.name);

  constructor(
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    this.eventBus.subscribe({
      next: val => {
        this.logger.debug(
          'Event Published ' + val.constructor.name + ' ' + JSON.stringify(val),
        );
      },
    });

    this.commandBus.subscribe({
      next: val => {
        this.logger.debug(
          'Command Published ' +
            val.constructor.name +
            ' ' +
            JSON.stringify(val),
        );
      },
    });

    this.queryBus.subscribe({
      next: val => {
        this.logger.debug(
          'Query Published ' + val.constructor.name + ' ' + JSON.stringify(val),
        );
      },
    });
  }
}
