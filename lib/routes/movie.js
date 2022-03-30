'use strict';

const Joi = require('joi')
const Jwt = require('@hapi/jwt');

module.exports = [
    {
      method: 'post',
      path: '/movie',
      options: {
        auth: {
          scope: [ 'admin' ]
        },
        tags: ['api'],
        validate: {
          payload: Joi.object({
            titre: Joi.string().min(3).example('Star wars Episode 4 : A new hope').description('Title of the movie'),
            description: Joi.string().min(3).example('Luke Skywalker join the rebellion').description('Description of the movie'),
            realisateur: Joi.string().min(8).example('George Lucas').description('Realisator of the movie'),
            date:  Joi.string().min(4).example('12/06/1977').description('Date of the movie')
          })
        }
      },
      handler: async (request, h) => {

        const { movieService } = request.services();
        const { sendMaileService } = request.services();
        sendMaileService.sendMailCreatedMovie(request.payload);
        return await movieService.create(request.payload);
      }
    },
    {
      method: 'PATCH',
      path: '/movie/{id}',
      options: {
          tags: ['api'],
          auth : {
            scope: [ 'admin' ]
          },
          validate: {
              params: Joi.object({
                id: Joi.number().integer().required()
              }),
              payload: Joi.object({
                titre: Joi.string().min(3).example('Star wars Episode 4 : A new hope').description('Title of the movie'),
                description: Joi.string().min(3).example('Luke Skywalker join the rebellion').description('Description of the movie'),
                realisateur: Joi.string().min(8).example('George Lucas').description('Realisator of the movie'),
                date:  Joi.string().min(4).example('12/06/1977').description('Date of the movie')
              })
          },
      },
      handler: async (request, h) => {
        const { movieService } = request.services();
        const { sendMaileService } = request.services();
        sendMaileService.sendEmailUpdateFavMovie(request.params.id);
        return  await movieService.update(request.params.id, request.payload);
      }
    },
    

];
