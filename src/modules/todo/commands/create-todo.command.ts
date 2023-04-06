import { Logger } from "@nestjs/common";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreateLogEvent } from "../../log/events/create-log.event";
import { Log } from "../../log/repository/log.model";
import { CreateTodoDoneEvent } from "../events/create-todo-done.event";
import { Todo } from "../repository/todo.model";
import { TodoRepository } from "../repository/todo.repository";

export class CreateTodoCommand {
    constructor(
        public readonly content: string,
        public readonly userId: string,
    ) { }

}

@CommandHandler(CreateTodoCommand)
export class CreateTodoCommandHandler
    implements ICommandHandler<CreateTodoCommand> {

    private readonly logger = new Logger(CreateTodoCommandHandler.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly todoRepository: TodoRepository,
    ) { }

    async execute(command: CreateTodoCommand) {
        this.logger.debug(`CreateTodoCommandHandler`);
        let todo = new Todo(command)
        let result = await this.todoRepository.create(todo)
        let log = new Log({
            key_unit: "todo",
            key_item: result.id,
            message: "create",
            user: command.userId
        })
        this.eventBus.publish(new CreateTodoDoneEvent(todo))
        this.eventBus.publish(new CreateLogEvent(log))
        return result
    }
}
