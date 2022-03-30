'use strict';

const Joi = require('joi')
const Jwt = require('@hapi/jwt');

module.exports = [
    {
      method: 'post',
      path: '/moviefav',
      options: {
        auth: {
          scope: [ 'user' ]
        },
        tags: ['api'],
        validate: {
          payload: Joi.object({
            movie: Joi.number().integer().example('1').description('id of the movie')
          })
        }
      },
      handler: async (request, h) => {
        const { moviefavService } = request.services();
        let token = request.headers.authorization.split(" ")[1];
        request.payload.user = Jwt.token.decode(token).decoded.payload.id;
        return await moviefavService.create(request.payload);
      }
    },
    
    

];
