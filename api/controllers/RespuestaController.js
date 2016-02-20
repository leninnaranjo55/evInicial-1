/**
 * RespuestaController
 *
 * @description :: Server-side logic for managing respuestas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	alrespuesta: function(req, res, next) {
		var respuestaRec = req.body.answered;
		var guardavalor1;
		var guardavalor2;
			
		Opcion.findOne({
			where: { id: Number(respuestaRec) }
		}).populate('subopciones').then(function(opcion){
				//console.log(opcion); 
			opcion.subopciones.forEach(function(subopcion){
				//De opcion entro a subopciones y con el forEach recorro en subopciones una subopcion
				if(subopcion.nombre=='fraccion'){
					guardavalor1=subopcion.valor; //guardo el valor de fraccion
					//sails.log.verbose(guardavalor1);
				}
				if(subopcion.nombre=='texto'){
					guardavalor2=subopcion.valor; //guardo el valor de texto
					//sails.log.verbose(guardavalor2);
				}
				})
			Respuesta.create({valor: guardavalor2, puntuacion: guardavalor1}).exec(function createCB(err, created){
  				res.send('Valor creada' + created.valor + ' Puntuacion creada ' + created.puntuacion);
				});
		}).catch(function(error){next(error);});
		
	}

};

