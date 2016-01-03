var editProfile = angular.module('editProfile', []);
editProfile.controller('editProfileCtrl', function($scope,$http,$window) {
	console.log("inside cntroller");
	
	$scope.addmobno = function()
	{
		$http({
			  method : "GET",
			  url : '/addmobno',
			  params :
				  {
			  "mobno" : $scope.ngmobno
				  }
		   }).success(function(response){
				   console.log("successfully added mobile no");
		   }).error(function(error)
		   {
			console.log("unsuccessful");
		   });

	};
	
	$scope.addWork = function()
	{
		$http({
			  method : "GET",
			  url : '/addwork',
			  params :
				  {
			  "job" : $scope.ngjob,
			  "location" : $scope.nglocation,
			  "from": $scope.ngfrom,
			  "to" : $scope.ngto
				  }
		   }).success(function(response){
				   console.log("successfully added work and education");
		   }).error(function(error)
		   {
			console.log("unsuccessful");
		   });

	};
	
	$scope.addInterest = function()
	{
		$http({
			  method : "GET",
			  url : '/addInterests',
			  params:{
			  "interest" : $scope.nginterest
			  }
		   }).success(function(response){
				   console.log("successfully added interests");
		   }).error(function(error)
		   {
			console.log("unsuccessful");
		   });

	};
	
	$scope.addEvent = function()
	{
		$http({
			  method : "GET",
			  url : '/addEvents',
			  params:{
			  "event" : $scope.nglifeevent,
			  "when" : $scope.ngwhen
			  }
		   }).success(function(response){
				   console.log("successfully added events");
		   }).error(function(error)
		   {
			console.log("unsuccessful");
		   });

	};
	
});
