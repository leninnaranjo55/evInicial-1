/**
* Pregunta.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    enunciado : {
    	type: 'string',
    	size: 255,
    	required: true
	},

    tipo : { type: 'string',
             enum: ['Empa', 'Numerica', 'True/False'],
    	  	required: true
    },

    cuestionarios : {
        collection : 'cuestionario',
        via : 'preguntas'
    },
    respuestas : {
        collection : 'respuesta',
        via : 'pregunta'
    },
    opciones : {
        collection : 'opcion',
        via : 'pregunta'
    }
  }
};

