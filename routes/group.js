
var ejs = require("ejs");
var mq_client = require('../rpc/client');

exports.createGroup = function(req,res)
{
	var id = 5;
	console.log("inside create group" + id);
	
	var grp_name = req.param("name");
	var grp_desc = req.param("desc");
	
	console.log(grp_name + "," + grp_desc);
	
	var msg_payload = {"id":id, "name" : grp_name, "description": grp_desc, "admin" : req.session.data.fname};
	mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
		console.log(results);
		if (err) {
			throw err;
		} else {
			console.log("i'm here");
			if (results.code == 200) {
				console.log("back to node: group creation successful");
				
				id = 9;
				var msg_payload = {"id":id, "email":req.session.data.fname};

				mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
					console.log(results);
					if (err) {
						throw err;
					} else {
						console.log("i'm here");
						if (results.code == 200) {
							console.log("back to node: fetched groups c successful");
							res.send(results.groups_c);
						} else {
							console.log("back to node: groups failed");
							res.send("failed");
						}
					}
				});

				
//				res.send(results.groups_c);
			} else {
				console.log("back to node: group creation failed");
				res.send("failed");
			}
		}
	});

};

exports.deleteGroup = function(req,res)
{
	var id = 6;
	console.log("inside delete group" + id);
	
	var grp_name = req.param("name");
	
	console.log(grp_name);
	
	var msg_payload = {"id":id, "name" : grp_name};
	mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
		console.log(results);
		if (err) {
			throw err;
		} else {
			console.log("i'm here");
			if (results.code == 200) {
				console.log("back to node: group deletion successful");
				
				id = 9;
				var msg_payload = {"id":id, "email":req.session.data.fname};

				mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
					console.log(results);
					if (err) {
						throw err;
					} else {
						console.log("i'm here");
						if (results.code == 200) {
							console.log("back to node: fetched groups c successful");
							res.send(results.groups_c);
						} else {
							console.log("back to node: groups failed");
							res.send("failed");
						}
					}
				});

				
				
//				res.send("success");
			} else {
				console.log("back to node: group deletion failed");
				res.send("failed");
			}
		}
	});
};

exports.getGroupsJoined = function(req,res)
{
	var id = 8;
	console.log("inside groups joined node "+req.session.data.fname);
	
	var msg_payload = {"id":id, "email":req.session.data.fname};

	mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
		console.log(results);
		if (err) {
			throw err;
		} else {
			console.log("i'm here");
			if (results.code == 200) {
				console.log("back to node: fetched groups successful");
				res.send(results.groups);
			} else {
				console.log("back to node: groups failed");
				res.send("failed");
			}
		}
	});
};

exports.getGroupsCreated = function(req,res)
{
	var id = 9;
	console.log("inside groups created node "+req.session.data.fname);
	
	var msg_payload = {"id":id, "email":req.session.data.fname};

	mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
		console.log(results);
		if (err) {
			throw err;
		} else {
			console.log("i'm here");
			if (results.code == 200) {
				console.log("back to node: fetched groups c successful");
				res.send(results.groups_c);
			} else {
				console.log("back to node: groups failed");
				
			}
		}
	});

};

exports.getGroupMembers = function(req,res)
{
	var id = 10;
	console.log("inside get group members node "+req.session.data.fname);
	var group_name = req.param("group_name");
	console.log(group_name);
	var msg_payload = {"id":id, "group_name":group_name};

	mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
		console.log(results);
		if (err) {
			throw err;
		} else {
			console.log("i'm here");
			if (results.code == 200) {
				console.log("back to node: fetched members successful");
				console.log(results.members[0].member);
				res.send(results.members);
			} else {
				console.log("back to node: members failed");
//				res.send("failed");
			}
		}
	});

};

exports.addMembertoGrp = function(req,res)
{
	var id = 11;
	console.log("inside add member" + id);
	
	var member_name = req.param("name");
	var group_name = req.param("group_name");
	
	console.log(member_name + ", " + group_name);
	
	var msg_payload = {"id":id, "member_name" : member_name, "group_name":group_name};
	mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
		console.log(results);
		if (err) {
			throw err;
		} else {
			console.log("i'm here");
			if (results.code == 200) {
				console.log("back to node: add member successful");
				
				id = 10;
				var msg_payload = {"id":id, "group_name":group_name};

				mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
					console.log(results);
					if (err) {
						throw err;
					} else {
						console.log("i'm here");
						if (results.code == 200) {
							console.log("back to node: show members successful");
							res.send(results.members);
						} else {
							console.log("back to node: show members failed");
							res.send("failed");
						}
					}
				});

				
//				res.send(results.groups_c);
			} else {
				console.log("back to node: add member failed");
				res.send("failed");
			}
		}
	});


};

//exports.showanyGroup = function(req,res)
//{
//	console.log("inside 1 display groups");
//	var group_name = req.param("name");
//	var group_desc = req.param("desc");
//	console.log(group_name + "," + group_desc);
//		res.render('showgroups',{title : 'Group',
//			group_name : group_name,
//			group_desc : group_desc});
//		
//};


exports.deleteMemberFromGrp = function(req,res)
{
	var id = 15;
	console.log("inside delete member" + id);
	
	var member_name = req.param("member");
	var group_name = req.param("group_name");
	
	console.log(member_name + ", " + group_name);
	
	var msg_payload = {"id":id, "member_name" : member_name, "group_name":group_name};
	mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
		console.log(results);
		if (err) {
			throw err;
		} else {
			console.log("i'm here");
			if (results.code == 200) {
				console.log("back to node: delete member successful");
				
				id = 10;
				var msg_payload = {"id":id, "group_name":group_name};

				mq_client.make_request('facebook_queue', msg_payload, function(err, results) {
					console.log(results);
					if (err) {
						throw err;
					} else {
						console.log("i'm here");
						if (results.code == 200) {
							console.log("back to node: show members successful");
							res.send(results.members);
						} else {
							console.log("back to node: show members failed");
							res.send("failed");
						}
					}
				});

				
//				res.send(results.groups_c);
			} else {
				console.log("back to node: add member failed");
				res.send("failed");
			}
		}
	});

};