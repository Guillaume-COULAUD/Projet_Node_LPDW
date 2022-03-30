'use strict';

const { Service } = require('@hapipal/schmervice'); 

module.exports = class MovieService extends Service {

        create(movie){

             const { Movie } = this.server.models();
        
             return Movie.query().insertAndFetch(movie);
        }   
        
        update(id, movie){


                const { Movie } = this.server.models();
           
                return Movie.query().updateAndFetchById(id, movie);
        }    

      
}




