import { Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(userId: string, content: string) {
    return await this.todoRepository.save({
      userId: { userId },
      content,
    });
  }

  async find(userId: string, date: Date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return await this.todoRepository.find({
      where: {
        userId: { userId },
        createdAt: Between(start, end),
      },
    });
  }
}
