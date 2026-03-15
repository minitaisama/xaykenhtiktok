import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('projects', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('title', 255).notNullable();
    table.text('description');
    table.text('thumbnail');
    table.text('video_url');
    table.string('category', 100);
    table.enum('package', ['chuyen-nghiep', 'cao-cap']).defaultTo('chuyen-nghiep');
    table.boolean('featured').defaultTo(false);
    table.integer('sort_order').defaultTo(0);
    table.integer('views').defaultTo(0);
    table.integer('likes').defaultTo(0);
    table.integer('shares').defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('projects');
}
