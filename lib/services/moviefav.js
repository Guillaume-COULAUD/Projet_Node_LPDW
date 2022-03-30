'use strict';

const { Service } = require('@hapipal/schmervice'); 

module.exports = class MoviefavService extends Service {
        //fonctionne mais une erreur s'affiche dans la console.
        create(movie){
              
            
            const { Moviefav } = this.server.models();  
            return Moviefav.query().insertAndFetch(movie);
        }      

      
}




