var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var path           = require('path');
var compression	   = require('compression');

// configuration ===========================================

// config files
var db = require('./config/db');

var port = process.env.PORT ||3000; // set our port
mongoose.connect(db.url, function (err) {
    if (err) console.log(err)
}); // connect to our mongoDB database (commented out after you enter in your own credentials)

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});




var express = require('express');
var app = express();
//var mongojs = require('mongojs');
//var db = mongojs('sampledb', ['types']);

var bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/persons', function(req, res){
	console.log('Received find all persons request');
	db.types.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.get('/person/:id', function(req, res){
	console.log('Received findOne person request');
	db.types.findOne({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.post('/addPerson', function(req, res){
	console.log(req.body);
	db.types.insert(req.body, function(docs){
		console.log(docs);
		res.json(docs);
	})
});

app.delete('/deletePerson/:id', function(req, res){
	console.log("Received delete one person request...");
	db.types.remove({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.put('/updatePerson', function(req, res){
	console.log("Received updatePerson request");
	db.types.findAndModify({query: {"_id": new mongojs.ObjectId(req.body._id)},
										update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}}
										}, function(err, docs){
											console.log(docs);
											res.json(docs);
										})
	});

//app.use(express.static(__dirname + "/app/views"));
app.listen(3000);
console.log("server running on port 3000");