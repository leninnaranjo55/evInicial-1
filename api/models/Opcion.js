/**
* Opcion.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	tipodeOpcion: {type: 'string', size: 45},

  	pregunta: { 
  		model: 'pregunta'
  	},

  	subopciones : {
        collection : 'subopcion',
        via : 'opcion'
    }

  }
};

