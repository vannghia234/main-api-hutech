import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Log } from "src/modules/log/repository/log.model";
import { Todo } from "../repository/todo.model";

export class CreateTodoDoneEvent {
    constructor(
        public readonly todo: Todo,
    ) { }
}


@EventsHandler(CreateTodoDoneEvent)
export class CreateTodoDoneEventHandler implements IEventHandler<CreateTodoDoneEvent> {
    private readonly logger = new Logger(CreateTodoDoneEventHandler.name);
    handle(event: CreateTodoDoneEvent) {
        this.logger.debug(`CreateTodoDoneEvent`);
        return Promise.resolve();
    }
}
