'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('moviefav', (table) => {

            table.number().integer('user').notNull();
            table.number().integer('movie').notNull();

            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('moviefav');
    }
};