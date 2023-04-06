import { Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CacheTodoService } from "../../cache/cache-todo.service";
import { Todo } from "../repository/todo.model";

export class PostProcessCommand {
    constructor(
        public readonly todo: Todo,
    ) { }

}

@CommandHandler(PostProcessCommand)
export class PostProcessCommandHandler
    implements ICommandHandler<PostProcessCommand> {

    private readonly logger = new Logger(PostProcessCommandHandler.name);

    constructor(
        private readonly cacheService: CacheTodoService,
    ) { }

    async execute(command: PostProcessCommand) {
        return this.cacheService.delAll('todo')
    }
}
