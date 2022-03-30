'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('moviefav', (table) => {
            table.integer('user').unsigned().index().references('id').inTable('user')
            table.integer('movie').unsigned().index().references('id').inTable('movie')
            table.primary(['user', 'movie'])

            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('moviefav');
    }
};