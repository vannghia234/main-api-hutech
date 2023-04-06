import { Logger } from "@nestjs/common";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { LogRepository } from "../repository/log.repository";

export class ClearLogCommand {
    constructor(
        public readonly key_unit: string,
    ) { }

}

@CommandHandler(ClearLogCommand)
export class ClearLogCommandHandler
    implements ICommandHandler<ClearLogCommand> {

    private readonly logger = new Logger(ClearLogCommandHandler.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(command: ClearLogCommand) {
        this.logger.debug(`ClearLogCommandHandler`);
        // console.log(command.log)
        try {
            await this.logRepository.clear(command.key_unit)
        } catch (error) {
            
        }
        return {}
    }
}
