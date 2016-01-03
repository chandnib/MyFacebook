
/**
 * Module dependencies.
 */

var express = require('express')
//  , routes = require('./routes')
  , home = require('./routes/home')
  , login = require('./routes/login')
  , http = require('http')
  , path = require('path');

//URL for the sessions collections in mongoDB
var mongoSessionConnectURL = "mongodb://localhost:27017/sessions";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");
var login = require("./routes/login");
var group = require("./routes/group");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
	secret: 'Lab2_facebook',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));

app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', login.facebook);
app.post('/login', login.login);
app.post('/signup', login.signup);
//app.get('/users', user.list);/
app.get('/home',home.home);
app.get('/groups',home.groups);
app.post('/createGroup',group.createGroup);
app.get('/deleteGroup',group.deleteGroup);
app.post('/addPost',home.addPost);
app.get('/signout',home.signout);
app.get('/getGroupsJoined',group.getGroupsJoined);
app.get('/getGroupsCreated',group.getGroupsCreated);
app.get('/getMembers',group.getGroupMembers);
app.get('/showgroups', function(req, res) {
	console.log("inside");
	res.render('../views/showgroups.ejs', {
		data : [ {
			"title" : 'Group',
			"group_name" : req.param('group_name'),
			"group_desc" : req.param('group_desc')
		} ]
	});
});
app.get('/addMember',group.addMembertoGrp);
app.get('/deleteMember',group.deleteMemberFromGrp);
app.get('/loadUserProfile',home.showProfile);
app.get('/reqlist',home.getRequests);
app.get('/acceptRequest',home.acceptReq);
app.get('/getStatus',home.getFriendStatus);
app.get('/changeStatus',home.changeFriendsStatus);
app.get('/editProfile',home.editUserProfile);
app.get('/addmobno',home.addmobileno);
app.get('/addwork',home.addUserWork);
app.get('/addEvents',home.addUserLifeEvents);
app.get('/addInterests',home.addUserInterests);
//app.get('/friendlist',home.getFriendsList);

mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});  
});
