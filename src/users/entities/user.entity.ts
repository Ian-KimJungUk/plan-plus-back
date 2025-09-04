import { BaseTable } from '../../common/entities/base-table.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { UserProvider } from './user-provider.entity';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '../../todo/entities/todo.entity';

export enum Role {
  admin = 'A',
  paidUser = 'B',
  user = 'C',
}

export enum UserStatus {
  active = 'A',
  inactive = 'B',
}

@Entity({ name: 'tbUser' })
export class User extends BaseTable {
  @PrimaryColumn({ type: 'char', length: 36 })
  userId: string;

  @BeforeInsert()
  generateId() {
    this.userId = uuidv4();
  }

  @Column({ nullable: true })
  email: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.active })
  status: UserStatus;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.user,
  })
  role: Role;

  @OneToMany(() => UserProvider, (userProvider) => userProvider.user, {
    cascade: ['insert'],
  })
  userProviders: UserProvider[];

  @OneToMany(() => Todo, (todo) => todo.userId)
  todos: Todo[];
}
