'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Movie extends Model {

    static get tableName() {

        return 'movie';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            titre: Joi.string().min(3).example('Star wars Episode 4 : A new hope').description('Title of the movie'),
            description: Joi.string().min(3).example('Luke Skywalker join the rebellion').description('Description of the movie'),
            realisateur: Joi.string().min(8).example('George Lucas').description('Realisator of the movie'),
            date:  Joi.string().min(4).example('12/06/1977').description('Date of the movie'),

            createdAt: Joi.date(),
            updatedAt: Joi.date(),
            
        });
    }

    $beforeInsert(queryContext) {
        
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

    static get jsonAttributes(){

        return ['scope']
    }


};