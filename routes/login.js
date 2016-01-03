
/*
 * GET home page.
 */


var ejs = require("ejs");
var mq_client = require('../rpc/client');
var  bcrypt = require('./bcrypt'); 

exports.facebook = function(req, res){
  res.render('facebook', { title: 'Facebook' });
};


exports.signup = function(req,res)
{
	
	var id = 1;
	console.log("inside signup node" + id);
	
	var email_matches = true;
	var response_code;
	
	var fname = req.param("fname");
	var lname = req.param("lname");
	var email = req.param("email");
	var email1 = req.param("email1");
	var npassword = req.param("npassword");
	var date = req.param("date");
	var month = req.param("month");
	var year = req.param("year");
	var gender = req.param("gender");
	
	var dob = year + "-" + month + "-" + date;
	var genderint = (gender === "female") ? 1 : 0;
	
	console.log(fname + "," + lname + "," + email + "," + email1  + "," + npassword + "," + dob + "," + genderint);
	
	if(email !== email1)
	{
		email_matches = false;
		response_code = 500;
		res.send(response_code);
	}
	else
		response_code = 200;
	
	console.log(response_code);
	

		bcrypt.cryptPassword(npassword, function(err,hash) {
			
			if(err)
				console.log(err);
			else
				{
				console.log("hash :" + hash);
		var msg_payload = {"id":id, "fname" : fname, "lname":lname, "email":email, "password" : hash, "dob":dob, "gender":genderint};
		mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
		console.log(results);
		if (err) {
			throw err;
		} else {
			if (results.code == 200) {
				console.log("back to node: record inserted successfully");
				res.send(response_code);
			} else {
				console.log("back to node: recrord inertion failed");
				res.send("failed");
			}
		}
				});
	}
		});

		
};

exports.login = function(req,res)
{
	var id = 25;
	console.log("inside node login" + id);
	
	var email = req.param("email");
	var password = req.param("password");
	
	console.log(email + "," + password);
	
/*	bcrypt.cryptPassword(password,function(err,result)
			{
					var newpassword = result;
					console.log(newpassword);
			});*/
	
	var msg_payload = {"id":id, "email" : email};
	mq_client.make_request('facebook_queue', msg_payload, function(err, hash) {
		
		console.log(hash);
		if (err) {
			throw err;
		} else {
			console.log("i'm here");
			if(hash.code == 200)
				{
				console.log("fetched hash successfully");
	console.log(hash.user.password);
	  bcrypt.comparePassword(password,hash.user.password,function(err,result){
	if(err)
		{
		res.send("failed");
		}
	else
		{
//		id = 18;
//		msg_payload = {"id":id, "email" : email};
//		
//		console.log("sending new request" + email);
//		console.log("msg_payload: " + msg_payload);
//		mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
//			console.log(results);
//			if (err) {
//				throw err;
//			} else {
				if (result) {
					console.log("back to node: user fetched successfully");
					req.session.data = hash.user;
					console.log(req.session.data +" is the current user's data");
					console.log(req.session.data.fname + "is the current user's first name");
					req.session.username = email;
					console.log(req.session.username +" is the session");
					console.log("back to node: login successful");
					res.send("success");
		}
				else
					{
						alert("Login failed");
					}
			}
		});
		}
	  
				}
		
	});
}
	
		
//		id = 2;
//	 msg_payload = {"id":id, "email" : email, "password": password};
//	mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
//		console.log(results);
//		if (err) {
//			throw err;
//		} else {
//			console.log("i'm here");
//			if (results.code == 200) {
//				id = 18;
//				msg_payload = {"id":id, "email" : email};
//				console.log("sending new request" + email);
//				console.log("msg_payload: " + msg_payload);
//				mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
//					console.log(results);
//					if (err) {
//						throw err;
//					} else {
//						if (results.code == 200) {
//							console.log("back to node: user fetched successfully");
//							req.session.data = results.user;
//							console.log(req.session.data +" is the current user's data");
//							console.log(req.session.data.fname + "is the current user's first name");
//							req.session.username = email;
//							console.log(req.session.username +" is the session");
//							console.log("back to node: login successful");
//							res.send("success");
//						} else {
//							console.log("back to node: user fetching failed");
//							res.send("failed");
//						}
//					}
//				});
//			} else {
//				console.log("back to node: login failed");
//				res.send("failed");
//			}
//		}
//	});
//		}
//	}
//				}
//				}
//				}); 
//	
//};



