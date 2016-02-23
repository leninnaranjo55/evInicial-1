/**
 * RespuestaController
 *
 * @description :: Server-side logic for managing respuestas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

		respuesta: function(req, res, next){
		req.pregunta.comprobarRespuesta(req.body.answered, req.session.passport.user, req.cuestionario.id, req.pregunta.id);
	}

	/*alrespuesta: function(req, res, next) {
		var respuestaRec = req.body.answered;
		var guardavalor1;
		var guardavalor2;
		
			
		Opcion.findOne({
			where: { id: Number(respuestaRec) }
		}).populate('subopciones').then(function(opcion){
				//console.log(opcion.subopciones); 

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
				});
				//console.log(req.session.passport.user);

				Alumno.findOne({
					where: {user: req.session.passport.user}
				}).then(function(alumno){
					//console.log(req.session.passport.user);
					if(alumno){

			Respuesta.create({valor: guardavalor2, puntuacion: guardavalor1, cuestionario: req.params.cuestionarioId, pregunta: req.params.preguntaId, alumno: alumno.id }).exec(function createCB(err, created){
  				res.send('Valor creada ' + created.valor + ' Puntuacion creada ' + created.puntuacion + ' Cuestionario creado ' + created.cuestionario + ' pregunta creada ' + created.pregunta + ' alumno creado ' + created.alumno);

				});
		}else{
			res.send("No estas auntenticado como alumno");
		}
		});
		
	})
}*/

};

