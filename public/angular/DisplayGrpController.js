var dispgroups = angular.module('dispgroups', []);
dispgroups.controller('dispgroupsCtrl', function($scope,$http) {
	console.log("inside cntroller");
	$scope.add = true;
	$scope.init = function(groupname)
	{
		console.log("inside init");
		 $http({
			  method : "GET",
			  url : '/getMembers',
			  params : {
				  "group_name":groupname
			  }
		   }).success(function(response){
				   console.log("successful");
				   $scope.grpmembers = response;
				   console.log("members" +$scope.grpmembers);
		   }).error(function(error){
			   console.log("unsuccessful");
		   });
	
	
	$scope.addmem = function()
	{
		$scope.add = false;
		$scope.ngnametoadd = "";
	};

//		 $http({
//			  method : "GET",
//			  url : '/getGroupsCreated',
//		   }).success(function(response){
//				   console.log("successful");
//				   $scope.grps_created = response;
//				   console.log("grps created" +$scope.grps_created);
//		   }).error(function(error){
//			   $scope.match = false;
//			   console.log("unsuccessful");
//		   });

	};
	
//	$scope.create = function()
//	{
//		$scope.createGrp = false;
//	};
	
	$scope.addMember = function(group_name)
	{
		$http({
			  method : "GET",
			  url : '/addMember',
			  params : {
					"name" : $scope.ngnametoadd,
					"group_name" : group_name
				}
		   }).success(function(response){
				   console.log("successful");
				   $scope.add = true;
				   $scope.grpmembers = response;
				   console.log($scope.grpmembers);
		   }).error(function(error){
			   console.log("unsuccessful");
		   });
	};
	
	$scope.deleteMember = function(groupname,membername)
	{
		console.log(groupname + "," + membername);
		$http({
			  method : "GET",
			  url : '/deleteMember',
			  params : {
					"group_name" : groupname,
					"member" : membername
				}
		   }).success(function(response){
				   console.log("successful");
				   $scope.grpmembers = response;
		   }).error(function(error){
			   console.log("unsuccessful");
		   });
	};
	
});