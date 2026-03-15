import knex from 'knex';
import { env } from './env';

const db = knex({
  client: 'pg',
  connection: env.DATABASE_URL,
  pool: { min: 2, max: 10 },
  migrations: {
    directory: '../db/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: '../db/seeds',
  },
});

export default db;
