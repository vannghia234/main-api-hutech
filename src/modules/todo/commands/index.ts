import { CreateTodoCommandHandler } from "./create-todo.command";
import { UpdateTodoCommandHandler } from "./update-todo.command";
import { DeleteTodoCommandHandler } from "./delete-todo.command";
import { PostProcessCommandHandler } from "./post-process.command";


export const CommandHandlers = [
    CreateTodoCommandHandler,
    UpdateTodoCommandHandler,
    DeleteTodoCommandHandler,
    PostProcessCommandHandler,
];
