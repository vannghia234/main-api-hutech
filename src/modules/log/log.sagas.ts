import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { mergeMap, filter, Observable, bufferWhen, interval } from 'rxjs';
import { AppConfig } from '../../lib/config/app.config';
import { InsertLogCommand } from './commands/insert-log.command';
import { CreateLogEvent } from './events/create-log.event';

@Injectable()
export class LogSagas {
  constructor(
    @Inject(AppConfig.KEY)
    private readonly appConfig: ConfigType<typeof AppConfig>,
  ) { }
  /**
   * Có hoạt động load dữ liệu từ database lên
   * ==> build dữ liệu cache Room-info
   */
  @Saga()
  createLogEvent = (events$: Observable<any>): Observable<ICommand> => {
    return events$
      .pipe(
        ofType(CreateLogEvent), //neu thay event gi do chay.
        bufferWhen(() => interval(this.appConfig.bufferTime)),
        filter(event => event.length > 0),
        mergeMap(event => [
          new InsertLogCommand(event.map(elem => elem.log)),
        ])
      );
  }
}