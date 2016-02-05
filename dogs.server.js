var app = require('express')();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dogs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var dogs = require('./routes/dogs.js')(app);

var server = app.listen(3001,function() {
	console.log('Server running at 127.0.0.1:3001');
});