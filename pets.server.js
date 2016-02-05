var app = require('express')();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var pets = require('./routes/pets.js')(app);

var server = app.listen(3002,function() {
	console.log('Pet Server running at 127.0.0.1:3002');
});