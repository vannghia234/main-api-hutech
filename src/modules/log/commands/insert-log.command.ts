import { Logger } from "@nestjs/common";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { Log } from "../repository/log.model";
import { LogRepository } from "../repository/log.repository";

export class InsertLogCommand {
    constructor(
        public readonly logs: Log[],
    ) { }

}

@CommandHandler(InsertLogCommand)
export class InsertLogCommandHandler
    implements ICommandHandler<InsertLogCommand> {

    private readonly logger = new Logger(InsertLogCommandHandler.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(command: InsertLogCommand) {
        this.logger.debug(`InsertLogCommandHandler`);
        try {
            await this.logRepository.create(command.logs)
        } catch (error) {
            await this.logRepository.createTable()
            await this.logRepository.create(command.logs)
        }
        return {}
    }
}
