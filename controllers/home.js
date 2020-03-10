var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');

router.use('/abc', express.static('xyz'));

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){	
	if(req.cookies['username'] != null){
		userModel.getByUname(req.cookies['username'], function(result){
			res.render('home/index', {customer: result});
		});
	}else{
		res.redirect('/logout');
	}
});

router.get('/delete/:id', function(req, res){
	
	userModel.getByIdCustomer(req.params.id, function(result){
		res.render('home/delete', {customer: result});
	});
})

router.post('/delete/:id', function(req, res){
	
	userModel.deleteCustomer(req.params.id, function(status){
		if(status){
			res.redirect('/home/allcustomer');
		}else{
			res.redirect('/home/delete/'+req.params.id);
		}
	});
})

router.get('/allcustomer', function(req, res){
	userModel.getAllCustomer(function(results){
		if(results.length > 0){
			res.render('home/allcustomer', {customerlist: results});
		}else{
			res.send('invalid username/password');
		}
	});
})

router.get('/allmessage', function(req, res){
	userModel.getAllMessage(function(results){
		if(results.length > 0){
			res.render('home/allmessage', {messagelist: results});
		}else{
			res.send('invalid message');
		}
	});
})

router.get('/allproperty', function(req, res){
	userModel.getAllProperty(function(results){
		if(results.length > 0){
			res.render('home/allproperty', {propertylist: results});
		}else{
			res.send('invalid username/password');
		}
	});
})

router.post('/allproperty', function(req, res){
		
		var property ={
			posted_by: req.body.uname
		};

		userModel.validateProperty(property, function(status){
			if(status){
				res.cookie('posted_by', req.body.uname);
				res.redirect('/home/search');
			}else{
				res.send('invalid username');
			}
		});
})

router.get('/search', function(req, res){	
	if(req.cookies['posted_by'] != null){
		userModel.getBySearchProperty(req.cookies['posted_by'], function(results){
			res.render('home/search', {propertylist: results});
		});
	}else{
		res.redirect('/home/allproperty');
	}
})

router.get('/propertyhistory', function(req, res){
		res.render('home/propertyhistory');	
})

router.post('/propertyhistory', function(req, res){
		
		var property ={
			status: req.body.uname
		};

		userModel.validatePProperty(property, function(status){
			if(status){
				res.cookie('status', req.body.uname);
				res.redirect('/home/searchStatus');
			}else{
				res.send('invalid status');
			}
		});
})

router.get('/searchStatus', function(req, res){	
	if(req.cookies['status'] != null){
		userModel.getAllbyStatus(req.cookies['status'], function(results){
			res.render('home/searchStatus', {propertylist: results});
		});
	}else{
		res.redirect('/home/propertyhistory');
	}
})

router.get('/mostVisitedproperty', function(req, res){
	userModel.getMostVisitedProperty(function(results){
		if(results.length > 0){
			res.render('home/mostVisitedproperty', {propertylist: results});
		}else{
			res.send('invalid property');
		}
	});
})

router.get('/topRankproperty', function(req, res){
	userModel.getTopRankProperty(function(results){
		if(results.length > 0){
			res.render('home/topRankproperty', {propertylist: results});
		}else{
			res.send('invalid property');
		}
	});
})

router.get('/featuredPost', function(req, res){
	userModel.getFeaturedPost(function(results){
		if(results.length > 0){
			res.render('home/featuredPost', {propertylist: results});
		}else{
			res.send('invalid property');
		}
	});
})

router.post('/allcustomer', function(req, res){
		
		var customer ={
			username: req.body.uname
		};

		userModel.validateCustomer(customer, function(status){
			if(status){
				res.cookie('username', req.body.uname);
				res.redirect('/home/searchCustomer');
			}else{
				res.send('invalid username');
			}
		});
})

router.get('/searchCustomer', function(req, res){	
	if(req.cookies['username'] != null){
		userModel.getBySearchCustomer(req.cookies['username'], function(results){
			res.render('home/searchCustomer', {customerlist: results});
		});
	}else{
		res.redirect('/home/allcustomer');
	}
})


router.get('/accept/:property_id', function(req, res){
	
	userModel.getByIdProperty(req.params.property_id, function(result){
		res.render('home/accept', {property: result});
	});
})

router.post('/accept/:property_id', function(req, res){
	
	var property = {
		status: req.body.status,
		property_id: req.params.property_id
	};

	userModel.updateProperty(property, function(status){
		if(status){
			res.redirect('/home/allproperty');
		}else{
			res.redirect('/home/accept/'+req.params.property_id);
		}
	});
})

router.get('/reject/:property_id', function(req, res){
	
	userModel.getByIdProperty(req.params.property_id, function(result){
		res.render('home/reject', {property: result});
	});
})

router.post('/reject/:property_id', function(req, res){
	
	userModel.deleteProperty(req.params.property_id, function(status){
		if(status){
			res.redirect('/home/allproperty');
		}else{
			res.redirect('/home/reject/'+req.params.property_id);
		}
	});
})

router.get('/reply/:message_id', function(req, res){
	
	userModel.getByIdMessage(req.params.message_id, function(result){
		res.render('home/reply', {message: result});
	});
})

router.post('/reply/:message_id', function(req, res){
	
	var message = {
		from: req.body.from,
		to: req.body.to,
		msg: req.body.msg,
		message_id: req.params.message_id
	};

	userModel.updateMessage(message, function(status){
		if(status){
			res.redirect('/home/allmessage');
		}else{
			res.redirect('/home/reply/'+req.params.message_id);
		}
	});
})

router.get('/deleteMessage/:message_id', function(req, res){
	
	userModel.getByIdMessage(req.params.message_id, function(result){
		res.render('home/deleteMessage', {message: result});
	});
})

router.post('/deleteMessage/:message_id', function(req, res){
	
	userModel.deleteMessage(req.params.message_id, function(status){
		if(status){
			res.redirect('/home/allmessage');
		}else{
			res.redirect('/home/deleteMessage/'+req.params.message_id);
		}
	});
})

router.get('/feedback', function(req, res){
	res.render('home/feedback');
})

router.post('/feedback', function(req, res){
		
		var message ={
			from: req.body.from,
			to: req.body.to
		};

		userModel.getAllbyFeedback(message, function(results){
			if(results.length >= 0){
				res.render('home/searchFeedback',{messagelist: results});
			}else{
				res.send('invalid name');
			}
		});
})

router.get('/searchFeedback', function(req, res){	
			res.render('home/searchFeedback');
})

module.exports = router;