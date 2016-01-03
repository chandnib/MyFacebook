var myGroups = angular.module('mygroups', []);
myGroups.controller('GroupsCtrl', function($scope,$http,$window) {
	console.log("inside cntroller");
	$scope.createGrp = true;
	$scope.init = function(groups, groups_created)
	{
		 $http({
			  method : "GET",
			  url : '/getGroupsJoined',
		   }).success(function(response){
				   console.log("successful");
				   $scope.grps_joined = response;
				   console.log("grps joined" +$scope.grps_joined);
		   }).error(function(error){
			   $scope.match = false;
			   console.log("unsuccessful");
		   });

		 $http({
			  method : "GET",
			  url : '/getGroupsCreated',
		   }).success(function(response){
				   console.log("successful");
				   $scope.grps_created = response;
				   console.log("grps created" +$scope.grps_created);
		   }).error(function(error){
			   $scope.match = false;
			   console.log("unsuccessful");
		   });

	};
	
	$scope.create = function()
	{
		$scope.createGrp = false;
		$scope.nggrpname = "";
		$scope.nggrpdesc = "";
	};
	
	$scope.createGroup = function()
	{
		$http({
			  method : "POST",
			  url : '/createGroup',
			  data : {
					"name" : $scope.nggrpname,
					"desc" : $scope.nggrpdesc
				}
		   }).success(function(response){
				   console.log("successful");
				   $scope.createGrp = true;
				   $scope.grps_created = response;
				   console.log($scope.grps_created);
		   }).error(function(error){
			   console.log("unsuccessful");
		   });
	};
	
	$scope.deleteGroup = function(groupname)
	{
		$http({
			  method : "GET",
			  url : '/deleteGroup',
			  params : {
					"name" : groupname
				}
		   }).success(function(response){
				   console.log("successful");
				   $scope.grps_created = response;
				   console.log($scope.grps_created);
		   }).error(function(error){
			   console.log("unsuccessful");
		   });
	};
	
	$scope.displayGroup = function(grp_name,grp_desc)
	{
		console.log(grp_name + "," +grp_desc );
		$window.location.href = "/showgroups?group_name="+ grp_name + "&group_desc="+ grp_desc ;
	};
	
});