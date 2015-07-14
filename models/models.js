var path = require('path');

//Cargar modelo ORM
var Sequelize = require('sequelize');

//usar BBDD SQlite:
var sequelize = new Sequelize(null,null,null,
						{dialect: "sqlite", storage: "quiz.sqlite"}
						);
						
//Importar la definici�n de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
exports.Quiz = Quiz; //exportar definici�n de tabla quiz

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function() {
	// success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function (count){
		if(count===0){ //la tabla se inicializa solo si est� vacia
			Quiz.create({ pregunta: 'Capital de Italia',
						  respuesta: 'Roma'
						  })
			.success(function(){console.log('base de datos inicializada')});	
		};
	});
});						