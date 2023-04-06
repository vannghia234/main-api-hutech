import { ClearLogCommandHandler } from "./clear-log.command";
import { InsertLogCommandHandler } from "./insert-log.command";

export const CommandHandlers = [
    InsertLogCommandHandler,
    ClearLogCommandHandler,
];
