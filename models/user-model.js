var db = require('./db');

module.exports ={
	getById: function(id, callback){
		var sql = "select * from customer where customer_id=?";
		db.getResult(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getByIdCustomer: function(id, callback){
		var sql = "select * from customer where customer_id=?";
		db.getResult(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getByIdProperty: function(id, callback){
		var sql = "select * from property where property_id=?";
		db.getResult(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getByIdMessage: function(id, callback){
		var sql = "select * from message where message_id=?";
		db.getResult(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getBySearchCustomer: function(uname, callback){
		var sql = "select * from customer where username=?";
		db.getResult(sql, [uname], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	getBySearchProperty: function(uname, callback){
		var sql = "select * from property where posted_by=?";
		db.getResult(sql, [uname], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	getByUname: function(uname, callback){
		var sql = "select * from customer where username=?";
		db.getResult(sql, [uname], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	
	validate: function(customer, callback){
		var sql = "select * from customer where username=? and password=?";
		db.getResult(sql, [customer.username, customer.password], function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	validateCustomer: function(customer, callback){
		var sql = "select * from customer where username=?";
		db.getResult(sql, [customer.username], function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	validateProperty: function(property, callback){
		var sql = "select * from property where posted_by=?";
		db.getResult(sql, [property.posted_by], function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	validatePProperty: function(property, callback){
		var sql = "select * from property where status=?";
		db.getResult(sql, [property.status], function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	validateFeedback: function(message, callback){
		var sql = "select * from message where from=? and to=?";
		db.getResult(sql, [message.from, message.to], function(result){
			if(result.length >=0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAll:function(callback){
		var sql = "select * from user";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	getAllCustomer:function(callback){
		var sql = "select * from customer";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	getAllMessage:function(callback){
		var sql = "select * from message";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	getAllProperty:function(callback){
		var sql = "select * from property";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	getAllbyFeedback:function(message, callback){
		var from = message.from;
		var to = message.to;
		if (from) {
			from = " and message.from like '%" + message.from + "%' ";
		}else{
			from = " ";
		}
		if (to) {
			to = " and message.to like '%" + message.to + "%' ";
		}else{
			to = " ";
		}
		var sql = "select * from message where message_id between 0 and 999999999 " + from + to;
		console.log(sql);
		db.getResult(sql,[message.from, message.to], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	getAllbyStatus:function(uname, callback){
		var sql = "select * from property where status=?";
		db.getResult(sql,[uname], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	getMostVisitedProperty:function(callback){
		var sql = "SELECT * FROM property ORDER BY no_of_clicks DESC";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},

	getTopRankProperty:function(callback){
		var sql = "SELECT * FROM property ORDER BY price DESC";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},

	getFeaturedPost:function(callback){
		var sql = "SELECT * FROM property ORDER BY posted_date DESC";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	
	insert: function(user, callback){
		var sql = "insert into user values(?,?,?,?)";
		db.execute(sql, [null, user.username, user.password, user.type], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(id, callback){
		var sql = "delete from user where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	deleteCustomer: function(id, callback){
		var sql = "delete from customer where customer_id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	deleteProperty: function(id, callback){
		var sql = "delete from property where property_id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	deleteMessage: function(id, callback){
		var sql = "delete from message where message_id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(user, callback){
		var sql = "update user set username=?, password=?, type=? where id=?";
		db.execute(sql, [user.username, user.password, user.type, user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	updateProperty: function(property, callback){
		var sql = "update property set status=? where property_id=?";
		db.execute(sql, [property.status,property.property_id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	updateMessage: function(message, callback){
		var from = message.from;
		var to = message.to;
		var msg = message.msg;
		var msg_date = message.msg_date;
		if (from) {
			from = " and message.from like '%" + message.from + "%' ";
		}else{
			from = " ";
		}
		if (to) {
			to = " and message.to like '%" + message.to + "%' ";
		}else{
			to = " ";
		}
		if (msg) {
			msg = " and msg like '%" + message.msg + "%'  ";
		}else{
			msg = " ";
		}
        if (msg_date) {
			msg_date = " and msg like '%" + message.msg_date + "%'  ";
		}else{
			msg_date = " ";
		}

		var sql = "update message set message.from=?, message.to=?, message.msg=?, message.msg_date=? where message_id=?";
		db.execute(sql,[message.from, message.to, message.msg, message.msg_date, message.message_id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
}