import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Log } from "../repository/log.model";

export class CreateLogEvent {
    constructor(
        public readonly log: Log,
    ) { }
}


@EventsHandler(CreateLogEvent)
export class CreateLogEventHandler implements IEventHandler<CreateLogEvent> {
    private readonly logger = new Logger(CreateLogEventHandler.name);
    handle(event: CreateLogEvent) {
        this.logger.debug(`CreateLogEvent`);
        return Promise.resolve();
    }
}
