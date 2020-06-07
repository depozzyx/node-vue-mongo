var mongoose = require('mongoose');

var fs = require('fs');
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors())

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('opened!')
});

var kittySchema = new mongoose.Schema({
  name: String
});
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log('---',greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);
var cat = new Kitten({ name: 'Silence' });


cat.save(function (err, cat) {
    if (err) return console.error(err);
    cat.speak();
	cat.speak()
});


Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log('---',kittens);
})

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

app.listen(3001, function() {

    console.log('App running on port 3001');

});
