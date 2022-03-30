'use strict';

const { Service } = require('@hapipal/schmervice'); 
const cryptage = require('@guillaumec/iut-encrypt');
const Jwt = require('@hapi/jwt');

module.exports = class UserService extends Service {

        create(user){

             const { User } = this.server.models();
        
             return User.query().insertAndFetch(user);
        }    

        delete(user){

                const { User } = this.server.models();
           
                return User.query().deleteById(user.id)
        }    
        
        update(id, user) {
                const { User } = this.server.models();
                return User.query().updateAndFetchById(id, user);
        }

        async login(userLogin) {
                const { User } = this.server.models();
                let user = await User.query().select("id", "firstName", "lastName", "password", "username", "scope").where("email", userLogin.email).first()
                let password = user.password;
                if(cryptage.compareSha1(userLogin.password, password)) {
                    return Jwt.token.generate(
                        {
                            aud: 'urn:audience:iut',
                            iss: 'urn:issuer:iut',
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            scope: user.scope,
                            id: user.id
                        },
                        {
                            key: 'random_string', 
                            algorithm: 'HS512'
                        },
                        {
                            ttlSec: 14400 
                        }
                    );
                } 
        
            }

      
}