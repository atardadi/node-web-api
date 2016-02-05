var _ = require('lodash');
var Dog = require('../models/dog.js');

module.exports = function(app) {
	
	/* Create */
	app.post('/dogs',function(req,res) {
		var newDog = new Dog(req.body);
		newDog.save(function(err) {
			if (err) {
				res.json({info: 'error during creation'});
			}
			else {
				res.json({info: 'Dog Created!'});
			}
		});
	});


	/* Read */
	app.get('/dogs',function(req,res) {
		Dog.find(function(err,dogs) {
			if (err) {
				res.json({info: 'error during fetch'});
			}
			else {
				res.json({info: 'Dog found!',data: dogs});	
			}
		});
	});

	app.get('/cats/:id',function(req,res) {
		Cat.findById(req.params.id,function(err,cat) {
			if (err) {
				res.json({info: 'error during fetch'});
			};
			res.json({info: 'Cat found!',data: cat});
		})	
	});

	/* update */
	app.put('/cats/:id', function(req,res) {
		Cat.findById(req.params.id,function(err,cat) {
			if (err) {
				res.json({info: 'cant find cat', error: err});
			}
			if (cat) {
				_.merge(cat,req.body);
				cat.save(function(err) {
					if (err) {
						res.json({info: 'error cat update', error: err});
					}
					res.json({info: 'Cat Updated!'});
				})
			}
			else {
				res.json({info: 'Cat not found'});
			}
		})		 

	});

	/* Delete */
	app.delete('/cats/:id', function(req,res) {
		_.remove(_cats, function(cat) {
			return cat.name === req.params.id;
		});
		res.json({info: 'Cat Deleted!'});
	});
}