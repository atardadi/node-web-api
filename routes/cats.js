var _ = require('lodash');
var Cat = require('../models/cat.js');

module.exports = function(app) {
	
	/* Create */
	app.post('/cats',function(req,res) {
		var newCat = new Cat(req.body);
		newCat.save(function(err) {
			if (err) {
				res.json({info: 'error during creation'});
			};
			res.json({info: 'Cat Created!'});
		})
	});


	/* Read */
	app.get('/cats',function(req,res) {
		Cat.find(function(err,cats) {
			if (err) {
				res.json({info: 'error during fetch'});
			};
			res.json({info: 'Cat found!',data: cats});
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