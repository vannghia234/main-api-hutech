import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as _ from 'lodash';
import { Logger } from '@nestjs/common';
import { CacheTodoService } from '../../cache/cache-todo.service';
import { TodoRepository } from '../repository/todo.repository';
import { Todo } from '../repository/todo.model';

export class GetListTodoQuery implements IQuery {
  public readonly userId: string;

  constructor(userId) {
    this.userId = userId;
  }
}

@QueryHandler(GetListTodoQuery)
export class GetListTodoQueryHandler
  implements IQueryHandler<GetListTodoQuery> {

  private readonly logger = new Logger(GetListTodoQueryHandler.name);
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly cacheService: CacheTodoService,
  ) { }

  async execute(
    query: GetListTodoQuery,
  ): Promise<any> {
    this.logger.debug(`GetListTodoQueryHandler`);
    let todos: Todo[];
    let cache = await this.cacheService.getAll("todo")
    if (!_.isEmpty(cache)) {
      return cache;
    }
    let result = await this.todoRepository.getList()
    todos = result.map(elem => new Todo(elem))
    await this.cacheService.create('todo', todos.map(elem => {
      return {
        key: elem.id,
        value: elem
      }
    }))
    return todos
  }
}
