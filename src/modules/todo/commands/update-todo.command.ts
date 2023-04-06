import { Logger } from "@nestjs/common";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreateLogEvent } from "../../log/events/create-log.event";
import { Log } from "../../log/repository/log.model";
import { UpdateTodoDoneEvent } from "../events/update-todo-done.event";
import { Todo } from "../repository/todo.model";
import { TodoRepository } from "../repository/todo.repository";

export class UpdateTodoCommand {
    constructor(
        public readonly dto: any,
        public readonly userId: string,
    ) { }

}

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoCommandHandler
    implements ICommandHandler<UpdateTodoCommand> {

    private readonly logger = new Logger(UpdateTodoCommandHandler.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly todoRepository: TodoRepository,
    ) { }

    async execute(command: UpdateTodoCommand) {
        this.logger.debug(`UpdateTodoCommandHandler`);
        let todo = new Todo(command.dto)
        let log = new Log({
            key_unit: "todo",
            key_item: command.dto.id,
            message: "update",
            user: command.userId
        })
        await this.todoRepository.update(todo)
        this.eventBus.publish(new UpdateTodoDoneEvent(todo))
        this.eventBus.publish(new CreateLogEvent(log))
        return {}
    }
}
