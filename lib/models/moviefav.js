'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Moviefav extends Model {

    static get tableName() {

        return 'moviefav';
    }

    static get joiSchema() {

        return Joi.object({
            user: Joi.number().integer().example('1').description('Id of user'),
            movie: Joi.number().integer().example('1').description('Id of movie'),


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