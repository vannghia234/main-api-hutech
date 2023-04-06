import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Log } from "src/modules/log/repository/log.model";
import { Todo } from "../repository/todo.model";

export class DeleteTodoDoneEvent {
    constructor(
        public readonly todo: Todo,
    ) { }
}


@EventsHandler(DeleteTodoDoneEvent)
export class DeleteTodoDoneEventHandler implements IEventHandler<DeleteTodoDoneEvent> {
    handle(event: DeleteTodoDoneEvent) {
        return Promise.resolve();
    }
}
