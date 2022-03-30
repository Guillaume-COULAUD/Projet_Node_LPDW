'use strict';

const { Service } = require('@hapipal/schmervice'); 

module.exports = class MoviefavService extends Service {

        create(movie){
              
            
            const { Moviefav } = this.server.models();  
            return Moviefav.query().insertAndFetch(movie);
        }      

      
}




