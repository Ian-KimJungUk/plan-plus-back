import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { BaseTable } from '../../common/entities/base-table.entity';
import { Exclude } from 'class-transformer';

export enum AuthProvider {
  local = 'local',
  google = 'google',
  kakao = 'kakao',
  naver = 'naver',
}

@Entity({ name: 'tbUserProvider' })
export class UserProvider extends BaseTable {
  @PrimaryGeneratedColumn()
  userProviderId: number;

  @Column({ type: 'enum', enum: AuthProvider })
  provider: AuthProvider;

  @Column()
  providerId: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @Exclude({ toPlainOnly: true })
  password?: string | null;

  @ManyToOne(() => User, (user) => user.userProviders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
