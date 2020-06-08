var mongoose = require('mongoose');

var fs = require('fs');
var express = require('express');
var app = express();
var cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true,useUnifiedTopology: true, dbpath: 'E:/'});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('opened!')
});


var articleSchema = new mongoose.Schema({
	name: String,
	desc: String,
	author: String,
	date: Number,
	rate: Number
});
var Article = mongoose.model('Article', articleSchema);

var userSchema = new mongoose.Schema({
	login: String, // @depozzyx
	name: String, // Depozzyx Depozzyx
	password: String,
	date: Number,
	rate: Number,
});
var User = mongoose.model('User', userSchema);
// kittySchema.methods.speak = function () {
//   var greeting = this.name
//     ? "Meow name is " + this.name
//     : "I don't have a name";
//   console.log('---',greeting);
// }




// Article.deleteMany({})
// Article.remove({}, function(err) {
//    console.log('collection removed')
// });

// var cat = new Kitten({ name: 'Silence' });
//
//
//
// cat.save(function (err, cat) {
//     if (err) return console.error(err);
//     cat.speak();
// 	cat.speak()
// });


// Kitten.find(function (err, kittens) {
//   if (err) return console.error(err);
//   console.log('---',kittens);
// })

// const MongoClient = require("mongodb").MongoClient;
//
// // создаем объект MongoClient и передаем ему строку подключения
// const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
// mongoClient.connect(function(err, client){
//
//     if(err){
//         return console.log(err);
//     }
//     // взаимодействие с базой данных
//     client.close();
// });

app.post('/MusicList',function(req, res) {

	fs.readdir('public/data/music', function (err, files) {
		//handling error
		if (err) {
			return console.log('Unable to scan directory: ' + err);
		}
		let durations = []
		files.forEach(function (file) {
			let buffer = fs.readFileSync('public/data/music/'+file)
			buffer = Math.round(getMP3Duration(buffer) / 1000)
			buffer = Math.round(buffer / 60) + ':' + ('0' + Math.round(buffer % 60)).slice(-2)
			durations.push(buffer);
		});
		// res.writeHead(200, {'Content-Type': 'text/plain'});
	    res.status(200).send([files,durations])
	});
});
// ACCOUNT SYSTEM

app.post('/NewUser',function(req, res) {
	let found = 0
	let clog = req.query.login

	User.find(function (err, obj) {
		if (err) return console.error(err);

		for (var i = 0; i < obj.length; i++) {
			if (clog === obj[i].login){
				found = 1
				break
			}
		}
	})

	if (found){
		res.status(200).send(0)
	}else{
		var userobj = new User({login: req.query.login,
								name: req.query.name,
								password: req.query.password,
								date: new Date(),
								rate: 0 });
		userobj.save(function (err, obj) {
		    if (err) return console.error(err);
		});
		res.status(200).send(1)
	}

});

app.post('/CompareUser',function(req, res) {
	let clog = req.query.login
	let cpas = req.query.password
	User.find(function (err, obj) {
		if (err) return console.error(err);
		let found = 0

		for (var i = 0; i < obj.length; i++) {
			if ((clog === obj[i].login) && (cpas === obj[i].password)){
				found = 1
				res.status(200).send([obj[i].name,obj[i].date,obj[i].rate])
				break
			}
		}
		if (found === 0){
			res.status(200).send(0)
		}

	})
});

// ARTICLE SYSTEM
app.post('/PostArticle',function(req, res) {
	var newe = new Article({name: req.query.name,
							desc: req.query.desc,
							author: req.query.author,
							date: new Date(),
							rate: 0 });
	newe.save(function (err, newe) {
	    if (err) return console.error(err);
	});

});

app.post('/GetArticle',function(req, res) {
	Article.find(function (err, articles) {
		if (err) return console.error(err);

		// console.log('---',articles);
		let return_array = []
		for (var i = 0; i < articles.length; i++) {
			return_array.push([articles[i].name,articles[i].desc,articles[i].author,articles[i].date,articles[i].rate])
		}
		console.log(return_array)
		res.status(200).send(return_array)
	})
});

app.listen(3001, function() {

    console.log('App running on port 3001');

});
