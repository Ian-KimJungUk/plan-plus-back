import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum Role {
  admin,
  paidUser,
  user,
}

@Entity({ name: 'tbUser' })
export class User {
  @PrimaryColumn()
  userId: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.user,
  })
  role: number;
}
