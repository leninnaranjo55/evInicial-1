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
             enum: ['Ensayo', 'Matching', 'Numerica', 'True/False', 'EleccionMultiple'],
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
    },

   getPregunta: function(){
        return this.toJSON();
    },
    //Mezcla de codigos de los demas

   comprobarRespuesta: function(respuesta, user, cuestionario, pregunta, res){

        switch(this.tipo) {
            case "Ensayo":
            this.comprobarEnsayo(respuesta, function cb(puntuacion, texto){
                    Alumno.findOne({
                        where: {user: user}
                    }).then(function(alumno){
                        if(alumno){
                            Respuesta.create({valor: texto, puntuacion: puntuacion, cuestionario: cuestionario, pregunta: pregunta, alumno: alumno.id})
                            .exec(function createCB(err, created){
                                res.json(created);
                            })
                        }else{
                            sails.log.verbose("No estas autenticado como usuario Alumno");
                        }
                    })
                });
            
            case "Emparejamiento":
                this.comprobarEmparejamiento(respuesta, function cb(puntuacion, texto){
                    Alumno.findOne({
                        where: {user: user}
                    }).then(function(alumno){
                        if(alumno){
                            Respuesta.create({valor: texto, puntuacion: puntuacion, cuestionario: cuestionario, pregunta: pregunta, alumno: alumno.id})
                            .exec(function createCB(err, created){
                                res.json(created);
                            })
                        }else{
                            sails.log.verbose("No estas autenticado como usuario Alumno");
                        }
                    })
                });
                break;

               
                break;
            case "Numerica":
                this.comprobarNumerica(respuesta, function cb(puntuacion, texto){
                    Alumno.findOne({
                            where: {user: user}
                        }).then(function(alumno){
                            //console.log(req.session.passport.user);
                            if(alumno){
                                Respuesta.create({valor: texto, puntuacion: puntuacion, cuestionario: cuestionario, pregunta: pregunta, alumno: alumno.id })
                                .exec(function createCB(err, created){
                                    res.json(created);
                                })
                            }else{
                                sails.log.verbose("No estas autenticado como usuario Alumno");
                            }
                        })
                });
               
                break;
            case "True/Flase":
                this.comprobarTrueFalse(respuesta, function cb(puntuacion, texto){
                            Alumno.findOne({
                                where: {user: user}
                            }).then(function(alumno){
                                if(alumno){
                                    Respuesta.create({valor: texto, puntuacion: puntuacion, cuestionario: cuestionario, pregunta: pregunta, alumno: alumno.id})
                                    .exec(function createCB(err, created){
                                        res.json(created);
                                    })
                                }else{
                                    sails.log.verbose("No estas autenticado como usuario Alumno");
                                }
                            })
                        });
               
                break;
            case "EleccionMultiple":
                this.comprobarEleccionMultiple(respuesta, function cb(puntuacion, texto){
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

    comprobarNumerica: function(respuesta, cb) {
        //var respuestaRec = req.body.answered;
        var guardavalor1;
        var guardavalor2;
        
            
        Opcion.findOne({
            where: { id: Number(respuesta) }
        }).populate('subopciones').then(function(opcion){
                //console.log(opcion.subopciones); 

            opcion.subopciones.forEach(function(subopcion){
                //De opcion entro a subopciones y con el forEach recorro en subopciones una subopcion
                if(subopcion.nombre=='fraction'){
                    guardavalor1=subopcion.valor; //guardo el valor de fraccion
                    //sails.log.verbose(guardavalor1);
                }
                if(subopcion.nombre=='text'){
                    guardavalor2=subopcion.valor; //guardo el valor de texto
                    //sails.log.verbose(guardavalor2);
                }
            });
            cb(guardavalor1, guardavalor2);
        })
                
    },


     comprobarTrueFalse: function(respuesta, cb) {
            var puntos = 0;
            var valorRespuesta = 0;
            Opcion.findOne({
                where: { id: Number(respuesta)}
            }).populate('subopciones').then(function(misOpciones){
                /*sails.log.verbose(misOpciones.subopcions[0]);*/
                misOpciones.subopciones.forEach(function(subopcion){
                    sails.log.verbose(subopcion);
                    if(subopcion.nombre === 'fraction'){
                        puntos= subopcion.valor;
                    }
                    if(subopcion.nombre === 'text'){
                        valorRespuesta= subopcion.valor;
                    }

                    });
                    cb(puntos, valorRespuesta);
                })
        },



    comprobarEleccionMultiple: function(respuesta, cb){
        Subopcion.findOne({
            where: {opcion: Number(respuesta), nombre: "fraction"}
        }).then(function(subopcion){
            var puntuacion = subopcion.valor;
            Subopcion.findOne({
                where: {opcion: Number(respuesta), nombre: "text"}
            }).then(function(subopcion){
                var texto = subopcion.valor;
                cb(puntuacion, texto);
            })  
        })
    }  
  }
}





