import { CreateTodoDoneEventHandler } from "./create-todo-done.event";
import { DeleteTodoDoneEventHandler } from "./delete-todo-done.event";
import { UpdateTodoDoneEventHandler } from "./update-todo-done.event";

export const EventHandlers = [
    CreateTodoDoneEventHandler,
    UpdateTodoDoneEventHandler,
    DeleteTodoDoneEventHandler,
];
