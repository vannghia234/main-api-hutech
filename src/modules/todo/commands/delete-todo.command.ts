import { Logger } from "@nestjs/common";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreateLogEvent } from "../../log/events/create-log.event";
import { Log } from "../../log/repository/log.model";
import { DeleteTodoDoneEvent } from "../events/delete-todo-done.event";
import { Todo } from "../repository/todo.model";
import { TodoRepository } from "../repository/todo.repository";

export class DeleteTodoCommand {
    constructor(
        public readonly id: number,
        public readonly userId: string,
    ) { }

}

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoCommandHandler
    implements ICommandHandler<DeleteTodoCommand> {

    private readonly logger = new Logger(DeleteTodoCommandHandler.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly todoRepository: TodoRepository,
    ) { }

    async execute(command: DeleteTodoCommand) {
        this.logger.debug(`DeleteTodoCommandHandler`);
        let todo = new Todo(command)
        let log = new Log({
            key_unit: "todo",
            key_item: command.id,
            message: "delete",
            user: command.userId
        })
        await this.todoRepository.delete(todo)
        this.eventBus.publish(new DeleteTodoDoneEvent(todo))
        this.eventBus.publish(new CreateLogEvent(log))
        return {}
    }
}
