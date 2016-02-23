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
             enum: ['Ensayo', 'Numerica', 'True/False', 'EleccionMultiple'],
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
  },

   getPregunta: function(){
        return this.toJSON();
    },
    //Mezcla de codigos de los demas

   comprobarRespuesta: function (respuesta, user, cuestionario, pregunta) {

        switch(this.tipo) {
    case "Ensayo":

       
        break;
    case "Numerica":
        this.comprobarNumerica(respuesta, function cb(){
            Alumno.findOne({
                    where: {user: user}
                }).then(function(alumno){
                    //console.log(req.session.passport.user);
                    if(alumno){

            Respuesta.create({valor: guardavalor2, puntuacion: guardavalor1, cuestionario: cuestionario, pregunta: pregunta, alumno: alumno.id }).exec(function createCB(err, created){
                res.send('Valor creada ' + created.valor + ' Puntuacion creada ' + created.puntuacion + ' Cuestionario creado ' + created.cuestionario + ' pregunta creada ' + created.pregunta + ' alumno creado ' + created.alumno);

                });
        }else{
            res.send("No estas auntenticado como alumno");
        }
        })
        });
       
        break;
    case "True/Flase":
       
        break;
    case "EleccionMultiple":
         this.comprobarEleccionMultiple(respuesta, function cb(){
                    Alumno.findOne({
                        where: {user: user}
                    }).then(function(alumno){
                        if(alumno){
                            Respuesta.create({valor: "Correcto", puntuacion: 100, cuestionario: cuestionario, pregunta: pregunta, alumno: alumno.id})
                            .exec(function createCB(err, created){
                                res.json(created);
                            })
                        }else{
                            sails.log.verbose("No estas autenticado como usuario Alumno");
                        }
                    })
                });
       
        break;
   
}
       
    },



    comprobarEleccionMultiple: function(respuesta, cb){
            Subopcion.findOne({
                where: {opcion: Number(respuesta), nombre: "fraccion"}
            }).then(function(subopcion){
                var puntuacion = subopcion.valor;
                Subopcion.findOne({
                    where: {opcion: Number(respuesta), nombre: "text"}
                }).then(function(subopcion){
                    var texto = subopcion.valor;
                    return cb(puntuacion, texto);
                })  
            })
        },

         
    alrespuesta: function(req, res, next) {
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
            })
        })
                
    },
  //}








};





