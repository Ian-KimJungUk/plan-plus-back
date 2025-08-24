import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { makeTypeOrmOptions } from './common/config/typeorm.options';

export default new DataSource(makeTypeOrmOptions(process.env));
