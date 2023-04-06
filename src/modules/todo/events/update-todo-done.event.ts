import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Log } from "src/modules/log/repository/log.model";
import { Todo } from "../repository/todo.model";

export class UpdateTodoDoneEvent {
    constructor(
        public readonly todo: Todo,
    ) { }
}


@EventsHandler(UpdateTodoDoneEvent)
export class UpdateTodoDoneEventHandler implements IEventHandler<UpdateTodoDoneEvent> {
    handle(event: UpdateTodoDoneEvent) {
        return Promise.resolve();
    }
}
