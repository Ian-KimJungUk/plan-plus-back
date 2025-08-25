import { Exclude } from 'class-transformer';
import { BaseTable } from '../../common/entities/base-table.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserProvider } from './user-provider.entity';

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
  @PrimaryColumn()
  userId: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Exclude({ toPlainOnly: true })
  password?: string | null;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.active })
  status: UserStatus;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.user,
  })
  role: Role;

  @OneToMany(() => UserProvider, (userProvider) => userProvider.user)
  userProviders: UserProvider[];
}
