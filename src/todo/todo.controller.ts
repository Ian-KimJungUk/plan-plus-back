import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@Req() req: any, @Body('content') content: string) {
    const { id } = req.user;
    await this.todoService.create(id, content);
  }

  @Get()
  async getTodo(@Req() req: any, @Query('date') date: Date) {
    const { id } = req.user;
    return await this.todoService.find(id, date);
  }
}
