
/*
 * GET users listing.
 */
var ejs = require("ejs");
var mq_client = require('../rpc/client');

exports.home = function(req, res){
	
	var id = 3;
	console.log("inside home node "+req.session.data.fname);
	
	var msg_payload = {"id":id, "email":req.session.data.fname};

	mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
		console.log(results);
		if (err) {
			throw err;
		} else {
			console.log("i'm here");
			if (results.code == 200) {
				console.log("back to node: fetched home successful");
				console.log(results.feeds);
				res.render('home', { title: 'Home',
									feeds : JSON.stringify(results.feeds),
									fname : req.session.data.fname,
									lname : req.session.data.lname
									});
			} else {
				console.log("back to node: login failed");
				res.send("failed");
			}
		}
	});
};

//exports.groups = function(req, res){
//	  res.render('groups', { title: 'Groups' });
//	};


exports.groups = function(req, res){
	
				res.render('groups', { title: 'Groups'});
			
};


exports.addPost = function(req,res)
{
	var id = 7;
	console.log("inside add post node "+req.session.data.fname);
	
	var post = req.param("feed");
	console.log("post is :" + post);
	
	var msg_payload = {"id":id, "email":req.session.data.fname, "feed":post};
		
	mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
		console.log(results);
		if (err) {
			throw err;
		} else {
			console.log("i'm here");
			if (results.code == 200) {
				
				id = 3;
				msg_payload = {"id":id, "email":req.session.data.fname};
				mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
					console.log(results);
					if (err) {
						throw err;
					} else {
						console.log("i'm here");
						if (results.code == 200) {
							console.log("back to node: fetched home successful");
							console.log(results.feeds);
//							res.feeds = results.feeds;
							res.send(results.feeds);
						} else {
							console.log("back to node: newsfeed failed");
							res.send("failed");
						}
					}
				});
				
				console.log("back to node: add post successful");
				//res.send(results.code); 
			} else {
				console.log("back to node: add post failed");
				res.send("failed");
			}
		}
	});
	
};

exports.signout = function(req,res)
{
	req.session.destroy();
	req.session=null;
	console.log("session destroyed");
	res.clearCookie();
	res.render('facebook', { title: 'Facebook' });
};

exports.showProfile = function(req,res)
{
	
	var user = req.param("txtsearch");
	console.log("profile to load : " + user);
	
	var id=14;
	console.log("inside load profile "+req.session.data.fname);
	
	var msg_payload = {"id":id, "user":user};

	mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
		console.log("hello" +results);
		if (err) {
			throw err;
		} else {
			console.log("i'm here");
			if (results.code == 200) {
				console.log("back to node: fetched profile successful");
				res.render('profile', { title: user ,
					profile : results.profile});
			} else {
				console.log("back to node: profile failed");
				
			}
		}
	});


};

//exports.getFriendsList = function(req,res)
//{
//	var id=22;
//console.log("inside get friends list "+req.session.data.fname);
//	
//	var msg_payload = {"id":id, "email":req.session.data.fname};
//
//	mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
//		console.log(results);
//		if (err) {
//			throw err;
//		} else {
//			console.log("i'm here");
//			if (results.code == 200) {
//				console.log("back to node: fetched requests successful");
//				res.send(results.members);
//			} else {
//				console.log("back to node: groups failed");
//				
//			}
//		}
//	});
//	
//};

exports.getRequests = function(req,res)
{
	var id = 12;
	console.log("inside get requests "+req.session.data.fname);
	
	var msg_payload = {"id":id, "email":req.session.data.fname};

	mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
		console.log(results);
		if (err) {
			throw err;
		} else {
			console.log("i'm here");
			if (results.code == 200) {
				console.log("back to node: fetched requests successful");
				res.send(results.requests);
			} else {
				console.log("back to node: groups failed");
				
			}
		}
	});
};


exports.acceptReq = function(req,res)
{
	var id = 13;
	var friendid = req.param("friendid");
	console.log("inside accept requests "+req.session.data.fname);
	console.log(friendid);
	
	var msg_payload = {"id":id, "email":req.session.data.fname,"friendid":friendid};

	mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
		console.log(results);
		if (err) {
			throw err;
		} else {
			console.log("i'm here");
			if (results.code == 200) {
				console.log("back to node: accept requests successful");
				
				id = 12;
				console.log("inside get requests "+req.session.data.fname);
				
				var msg_payload = {"id":id, "email":req.session.data.fname};

				mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
					console.log(results);
					if (err) {
						throw err;
					} else {
						console.log("i'm here");
						if (results.code == 200) {
							console.log("back to node: fetched requests successful");
							res.send(results.requests);
						} else {
							console.log("back to node: groups failed");
							
						}
					}
				});
				
				
//				res.send(results.requests);
			} else {
				console.log("back to node: accept request failed");
				
			}
		}
	});
};

exports.getFriendStatus = function(req,res)
{
	var id = 16;
	var friendid = req.param("friendid");
	console.log("inside get Status "+req.session.data.fname);
	console.log(friendid);
	
	var msg_payload = {"id":id, "email":req.session.data.fname, "friendid":friendid};
	mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
		console.log(results);
		if (err) {
			throw err;
		} else {
			console.log("i'm here");
			if (results.code == 200) {
				console.log("back to node: fetched status successful");
				res.send(results.status);
			} else {
				console.log("back to node: status failed");
				
			}
		}
	});
	
	
};


exports.changeFriendsStatus = function(req,res)
{
	var id = 17;
	var status = req.param("status");
	var friendid = req.param("friendid");
	console.log("inside change Status "+req.session.data.fname);
	console.log(friendid + "," + status);
	var newStatus;
	
	if(status === "Add Friend")
		{
		newStatus = "Friend Request Sent";
		}
	else if(status === "Friend Request Sent")
		{
		newStatus = "Friends";	
		}
		
		
	var msg_payload = {"id":id, "email":req.session.data.fname, "friendid":friendid, "status" : newStatus};
	mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
		console.log(results);
		if (err) {
			throw err;
		} else {
			console.log("i'm here");
			if (results.code == 200) {
				console.log("back to node: changed status successful");
				
				id = 16;
				msg_payload = {"id":id, "email":req.session.data.fname, "friendid":friendid};
				mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
					console.log(results);
					if (err) {
						throw err;
					} else {
						console.log("i'm here");
						if (results.code == 200) {
							console.log("back to node: fetched status successful");
							console.log(results.status[0].status);
							res.send(results.status[0].status);
						} else {
							console.log("back to node: status failed");
							
						}
					}
				});
//				res.send(results.status);
			} else {
				console.log("back to node: status failed");
				
			}
		}
	});

	
	
	
};

exports.editUserProfile = function(req,res)
{
	res.render('editProfilePage', { title: 'Edit Profile' });
};


exports.addmobileno = function(req,res)
{
	var id = 19;
	console.log("inside add  mob no" + id);
	
	var mobno = req.param("mobno");
	var msg_payload = {"id":id, "fname":req.session.data.fname,"mobno" :mobno };
	
	mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
		console.log(results);
		if (err) {
			throw err;
		} else {
			console.log("i'm here");
			if (results.code == 200) {
				console.log("back to node: added mob no successful");
				res.send("success");
			} else {
				console.log("back to node: added mob no failed");				
			}
		}
	});
	
};

exports.addUserWork = function(req,res)
{
	var id = 20;
	console.log("inside add  work" + id);
	
	var job = req.param("job");
	var location = req.param("location");
	var from = req.param("from");
	var to = req.param("to");
	var msg_payload = {"id":id,"fname":req.session.data.fname,"job":job,"location":location,"from":from, "to":to };
	mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
		console.log(results);
		if (err) {
			throw err;
		} else {
			console.log("i'm here");
			if (results.code == 200) {
				console.log("back to node: added work successful");
				res.send("success");
			} else {
				console.log("back to node: added work failed");				
			}
		}
	});
};

exports.addUserInterests = function(req,res)
{
	var id = 21;
	console.log("inside add  interests" + id);
	
	var interest = req.param("interest");
	
	var msg_payload = {"id":id,"fname":req.session.data.fname,"interest":interest };
	mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
		console.log(results);
		if (err) {
			throw err;
		} else {
			console.log("i'm here");
			if (results.code == 200) {
				console.log("back to node: added interest successful");
				res.send("success");
			} else {
				console.log("back to node: added interest failed");				
			}
		}
	});
};

exports.addUserLifeEvents = function(req,res)
{
	var id = 22;
	console.log("inside add  work" + id);
	
	var title = req.param("title");
	var when = req.param("when");
	
	var msg_payload = {"id":id,"fname":req.session.data.fname,"title":title,"when":when};
	mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
		console.log(results);
		if (err) {
			throw err;
		} else {
			console.log("i'm here");
			if (results.code == 200) {
				console.log("back to node: added event successful");
				res.send("success");
			} else {
				console.log("back to node: added event failed");				
			}
		}
	});
};