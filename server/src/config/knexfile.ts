import { env } from './env';
import path from 'path';

const config = {
  client: 'pg',
  connection: env.DATABASE_URL,
  pool: { min: 2, max: 10 },
  migrations: {
    directory: path.resolve(__dirname, '../db/migrations'),
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: path.resolve(__dirname, '../db/seeds'),
  },
};

export default config;
module.exports = config;
