var myhome = angular.module('myhome', []);
myhome.controller('homeCtrl', function($scope,$http) {
	console.log("inside controller");
	$scope.funcinit = function(feeds,fname,lname)
	{	
		$scope.newsfeeds = JSON.parse(feeds);
		$scope.fname = fname;
		$scope.lname = lname;
		 $http({
			  method : "GET",
			  url : '/reqlist'
		   }).success(function(response){
				   console.log("successful");
				   $scope.reqlist = response;
				   console.log("requests :" +$scope.reqlist);
		   }).error(function(error){
			   console.log("unsuccessful");
		   });
//
//		 $http({
//			  method : "GET",
//			  url : '/friendlist'
//		   }).success(function(response){
//				   console.log("successful");
//				   $scope.friendlist = response;
//				   console.log("requests :" +$scope.friendlist);
//		   }).error(function(error){
//			   console.log("unsuccessful");
//		   });
//
//		
	};
	
	$scope.addPost = function()
	{
			 $http({
		  method : "POST",
		  url : '/addPost',
		  data : {
				"feed" : $scope.ngpost
			    }
	   }).success(function(response){
			   console.log("successful");
			   $scope.newsfeeds = response;
			   console.log("add post" +$scope.newsfeeds);
			   $scope.ngpost = "";
	   }).error(function(error){
		   $scope.match = false;
		   console.log("unsuccessful");
	   });

	
	};
	
	$scope.acceptReq = function(friendid)
	{
		console.log(friendid);
			 $http({
		  method : "GET",
		  url : '/acceptRequest',
		  params : {
				"friendid" : friendid
			    }
	   }).success(function(response){
			   console.log("successful");
			   $scope.reqlist = response;
			   console.log("new req list" +$scope.reqlist);
	   }).error(function(error){
		   console.log("unsuccessful");
	   });

	
	};
	
});