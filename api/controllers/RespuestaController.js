/**
 * RespuestaController
 *
 * @description :: Server-side logic for managing respuestas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	alrespuesta: function(req, res, next) {
		var respuestaRec = req.body.answered;
		
			
		Opcion.findOne({
			where: { id: Number(respuestaRec) }
		}).populate("subopciones").then(function(opcion){
			if(opcion){

			}
		}).catch(function(error){next(error);});
		
	}

};

