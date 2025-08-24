import { Exclude } from 'class-transformer';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseTable {
  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
