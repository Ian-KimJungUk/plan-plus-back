import { User } from '../../users/entities/user.entity';
import { BaseTable } from '../../common/entities/base-table.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum TodoStatus {
  notStarted = 'A',
  inProgress = 'B',
  completed = 'C',
  cancelled = 'D',
  delayed = 'E',
  important = 'F',
  anniversary = 'G',
  memo = 'H',
  plan = 'I',
}

@Entity({ name: 'tbTodo' })
export class Todo extends BaseTable {
  @PrimaryGeneratedColumn()
  todoId: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.notStarted })
  status: TodoStatus;

  @ManyToOne(() => User, (user) => user.todos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  userId: User;
}
