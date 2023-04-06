import {
  Controller,
  Post,
  Request,
  HttpCode,
  Body,
  Query,
  Get,
} from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto, DeleteTodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(
    private readonly service: TodoService,
  ) { }

  @HttpCode(200)
  @Get('get-list')
  async getList(@Query() query, @Request() req: any) {
    return this.service.getList(req.user.id);
  }

  @HttpCode(200)
  @Post('create')
  async create(@Body() body: CreateTodoDto, @Request() req: any) {
    return this.service.create(body, req.user.id);
  }

  @HttpCode(200)
  @Post('update')
  async update(@Body() body: UpdateTodoDto, @Request() req: any) {
    return this.service.update(body, req.user.id);
  }

  @HttpCode(200)
  @Post('delete')
  async delete(@Body() body: DeleteTodoDto, @Request() req: any) {
    return this.service.delete(body, req.user.id);
  }
}
