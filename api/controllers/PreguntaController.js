/**
 * PreguntaController
 *
 * @description :: Server-side logic for managing preguntas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	load: function(req, res, next) {
		Pregunta.findOne({
			where: { id: Number(req.params.preguntaId)}
		}).then(function(pregunta){
			if(pregunta) {
				req.pregunta = pregunta;
				next();
			} else { next(new Error('No existe la pregunta con el id' + req.params.preguntaId));}
		}).catch(function(error){next(error);});
	},

	corregirRespuesta: function(req, res) {
		var respuestaVal = (req.query.respuesta) ? req.query.respuesta : undefined,
			resultado = 'Incorrecto';
		if(req.pregunta.respuesta == respuestaVal) {
			resultado = 'Correcto';
		}
		res.json(resultado);
	},



	//
	findOne: function(req, res) {
		
		Pregunta.findOne({
			where: { id: Number(req.params.id)}
		}).then(function(pregunta){
			if(pregunta) {
				preguntaJSON = pregunta.toJSON(); //convierte en un objeto JSON.
				 Opcion.find({
						pregunta:req.params.id
					}).populate('subopciones').then(function(opcion){
						if(opcion){
							preguntaJSON.opciones = opcion; //todas las opciones se añade al objeto JSON del find opcion.
							res.json(preguntaJSON); //el objeto JSON devuelve pregunta y opcion.
						}else { next(new Error('No existe las opciones con el id' + req.params.preguntaId));}
					}).catch(function(error){next(error);});

			}else { next(new Error('No existe la pregunta con el id' + req.params.preguntaId));}


		}).catch(function(error){next(error);});

       
		
			
		
	} 
};

