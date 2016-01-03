var myFacebook = angular.module('myFacebook', []);
myFacebook.controller('mycontroller', function($scope,$http,$location) {
	$scope.months = ["Month","January","February","March","April","May","June","July","August","Spetember","October","November","December"];
	console.log("cntroller");
	$scope.match = true;
	$scope.accountCreated = true;
	$scope.createUser = function()
	{
			 $http({
		  method : "POST",
		  url : '/signup',
		  data : {
				"fname" : $scope.ngfname,
			    "lname" : $scope.nglname,		  			
				"email" : $scope.ngemail,
				"email1": $scope.ngemail1,
				"npassword" : $scope.ngnewpaswd,
				"date" : $scope.ngdate,
				"month" : $scope.ngmonth,
				"year" : $scope.ngyear,
				"gender" : $scope.nggender
			}
	   }).success(function(response_code){
			   console.log("successful");
			   var frmSignUp = document.getElementById("frmSignUp");
			   frmSignUp.reset();  	
			   $scope.accountCreated = false;
//	           alert("Account Created !!! Please Login");
	   }).error(function(error){
		   $scope.match = false;
//	   		console.log($scope.match);
		   console.log("unsuccessful");
	   });
	};
	
	
	$scope.login = function()
	{
			 $http({
		  method : "POST",
		  url : '/login',
		  data : {
				"email" : $scope.ngmail,
			    "password" : $scope.ngpasswrd
			}
	   })
	   .success(function(response){
		   if(response === "success"){
		   console.log("success");
		   window.location = '/home';
		   }
		   else{
			   console.log("unsuccessful");
			   alert("LOgin Failed");
		   }
	   }).error(function(error){
		   console.log("unsuccessful");
	   });
	};
	
});
