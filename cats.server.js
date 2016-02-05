var app = require('express')();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cats');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var cats = require('./routes/cats.js')(app);

var server = app.listen(3000,function() {
	console.log('Server running at 127.0.0.1:3000');
});