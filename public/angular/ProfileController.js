var myprofile = angular.module('myprofile', []);
myprofile.controller('profileCtrl', function($scope,$http) {
	console.log("inside cntroller");
	$scope.init = function(friendid)
	{
		 $http({
			  method : "GET",
			  url : '/getStatus',
			  params : {
					"friendid" : friendid
				    }
		   }).success(function(response){
				   console.log("successful");
//				   var x = [];
//				   console.log("x is " + x.unknownProperty);
				   if(response.unknownProperty == undefined)
					   {
					   console.log("yes!!!");
					   	response = "Add Friend";
					   }
				   console.log("RESPONSE" + response);
				   $scope.status = response;
				   console.log("user" +$scope.status);
		   }).error(function(error){
			   console.log("unsuccessful");
		   });
		
	};
	
	
	$scope.changeStatus = function(friendid,status)
	{
		console.log(status);
		 $http({
			  method : "GET",
			  url : '/changeStatus',
			  params : {
				  "friendid" : friendid,
					"status" : status
					
				    }
		   }).success(function(response){
				   console.log("successful");
				   $scope.status = response;
				   console.log("response:"+response);
				  console.log("Status :" + $scope.status);
		   }).error(function(error){
			   console.log("unsuccessful");
		   });
	};
	});