/**
* Subopcion.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	nombre: {type: 'string', size: 30},

  	valor: {type: 'string', size: 255},

  	opcion: { 
  		model: 'opcion'
  	}

  }
};

