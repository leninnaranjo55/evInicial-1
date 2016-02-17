/**
* Alumno.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    apellidos : { type: 'string', size: 45 },

    nombre : { type: 'string', size: 45 },

    email : { type: 'string', email: true, size: 45},

    user: {
        model: 'user'
    },

    grupos: {
        collection : 'grupo',
        via : 'alumnos'
    },

    cuestionarios : {
    	collection : 'cuestionario',
    	via : 'alumnos'
    },

    

  }
};

