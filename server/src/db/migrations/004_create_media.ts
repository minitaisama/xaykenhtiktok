import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('media', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('filename', 255).notNullable();
    table.string('original_name', 255).notNullable();
    table.string('mime_type', 100).notNullable();
    table.integer('size').notNullable();
    table.text('path').notNullable();
    table.text('thumbnail_path');
    table.string('alt_text', 500);
    table.uuid('project_id').references('id').inTable('projects').onDelete('SET NULL');
    table.uuid('uploaded_by').references('id').inTable('users');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('media');
}
