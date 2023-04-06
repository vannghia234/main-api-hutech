import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { mergeMap, Observable } from 'rxjs';
import { PostProcessCommand } from './commands/post-process.command';
import { CreateTodoDoneEvent } from './events/create-todo-done.event';
import { UpdateTodoDoneEvent } from './events/update-todo-done.event';
import { DeleteTodoDoneEvent } from './events/delete-todo-done.event';

@Injectable()
export class TodoSagas {

  /**
   * Có hoạt động load dữ liệu từ database lên
   * ==> build dữ liệu cache Room-info
   */
  @Saga()
  createTodoDoneEvent = (events$: Observable<any>): Observable<ICommand> => {
    return events$
      .pipe(
        ofType(CreateTodoDoneEvent, UpdateTodoDoneEvent, DeleteTodoDoneEvent), //neu thay event gi do chay.
        mergeMap(event => [
          new PostProcessCommand(event.todo),
        ])
      );
  }
}