var r = require('request').defaults({
	json: true
});
var async = require('async');

var redis = require('redis');
var client = redis.createClient(6379,'127.0.0.1');

module.exports = function(app) {
	app.get('/pets', function(req,res) {
		async.parallel({
			cat: function(callback) {
				r({uri: 'http://localhost:3000/cats'}, 
					function(err, response, body) {
					if (err) {
						callback({service: 'cats', error: err});
						return;
					}
					if (!err && response.statusCode === 200) {
						callback(null,body.data);
					}
					else {
						callback(response.statusCode);
					}
				})
			},
			dog: function(callback) {
				client.get('http://localhost:3001/dogs', function(error, dog) {
					if (error) {throw error;}

					if (dog) {
						res.json(JSON.parse(dog));
					}
					else {
						r({uri: 'http://localhost:3001/dogs'}, 
							function(error, response, body) {
							if (error) { 
								callback({service: 'dog', error: error});
								return;
							}

							if (!error && response.statusCode === 200) {
								callback(null,body.data);
								client.setex(req.params.id,10, JSON.stringify(body.data), function(error) {
									if (error) {throw error;}
								})
							}
							else {
								callback(response.statusCode);
							}
						})		
					}
				})

				
			}
		},
		function(error, results) {
			res.json({
				error: error,
				results: results
			});
		});
	});

	app.get('/ping', function(req,res) {
		d = new Date();
		res.json({time: d});
	})
	
}