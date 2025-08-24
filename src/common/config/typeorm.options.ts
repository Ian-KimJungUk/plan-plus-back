import { DataSourceOptions } from 'typeorm';
import { join } from 'path';

export const makeTypeOrmOptions = (
  env: NodeJS.ProcessEnv,
): DataSourceOptions => ({
  type: 'mysql',
  host: env.DB_HOST!,
  port: Number(env.DB_PORT || 3306),
  username: env.DB_USERNAME!,
  password: env.DB_PASSWORD!,
  database: env.DB_DATABASE!,
  entities: [join(__dirname, '../..', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '../..', 'migrations', '*.{ts,js}')],
  synchronize: false,
  logging: true,
});
