'use strict';

const Joi = require('joi')
const cryptage = require('@guillaumec/iut-encrypt');
const Jwt = require('@hapi/jwt');

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            auth: false,
            tags: ['api'],
            validate: {
              payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                password: Joi.string().required().min(3).example('Motdepasse&').description('Password of the user'),
                email: Joi.string().required().min(3).example('guillaume@gmail.com').description('Email of the user'),
                username: Joi.string().required().min(3).example('GuillaumeC').description('Username of the user')
              })
            }
        },
        handler: async (request, h) => {
    
            const { userService } = request.services();
            request.payload.password = cryptage.sha1(request.payload.password);
            const { sendMaileService } = request.services();
            sendMaileService.sendMailSignIn(request.payload.email);
            return await userService.create(request.payload);

        }
    },
    {
      method: 'get',
      path: '/users',
      options: {
        auth : {
          scope: [ 'admin', 'user']
        },
        tags:['api']
      },
      handler: async (request, h) => {
    
        const { User } = request.models();
        
        // Objection retourne des promeses, il ne faut pas oublier des les await.
        const user = await User.query();

        return user;
      }
  },
  {
    method: 'delete',
    path: '/user',
    options: {
      auth : {
        scope: [ 'admin' ]
      },
      tags: ['api'],
      validate: {
          payload: Joi.object({
              id: Joi.number().integer().min(1).description('Id of the user')
          })
      }
    },
    handler: async (request, h) => {
    
      const { userService } = request.services();
      return  userService.delete(request.payload);
    }
  },
  {
    method: 'PATCH',
    path: '/user/{id}',
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
              firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
              lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
              password: Joi.string().min(8).example('Motdepasse1').description('Password of the user'),
              username: Joi.string().min(8).example('GuillaumeC').description('Username of the user'),
              email: Joi.string().min(3).example('guillaume@gmail.com').description('Email of the user'),
              scope : Joi.string().allow("user","admin").example('user').description('Scope of the user')
            })
        },
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        return await userService.update(request.params.id, request.payload)
    }
  },
  {
    method: 'post',
    path: '/user/login',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
          payload: Joi.object({
            email: Joi.string().required().min(3).example('guillaume@gmail.com').description('Email of the user'),
            password: Joi.string().required().min(3).example('MotDePasse1').description('Password of the user')
          })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();
        return await userService.login(request.payload );
      
    }
  }

];
