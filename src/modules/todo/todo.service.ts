import { Injectable } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetListTodoQuery } from './queries/get-list-todo.query';
import { CreateTodoCommand } from './commands/create-todo.command';
import { UpdateTodoCommand } from './commands/update-todo.command';
import { DeleteTodoCommand } from './commands/delete-todo.command';

@Injectable()
export class TodoService {
  constructor(
    // private readonly httpService: HttpService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) { }

  getList(userId) {
    return this.queryBus.execute(new GetListTodoQuery(userId))
  }

  create(dto, userId) {
    return this.commandBus.execute(new CreateTodoCommand(dto.content, userId))
  }

  update(dto, userId) {
    return this.commandBus.execute(new UpdateTodoCommand(dto, userId))
  }

  delete(dto, userId) {
    return this.commandBus.execute(new DeleteTodoCommand(dto.id, userId))
  }
}
