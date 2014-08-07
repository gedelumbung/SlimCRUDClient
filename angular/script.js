var app = angular.module('App', []).controller('CrudCtrl', ['$scope', 'crudService',
	function($scope, $crudService) {
	    
	  $scope.AddProfile = {};
	  
	  $scope.showForm = false;
	  
	  $scope.displayForm = function(condition){
	      $scope.showForm = condition;
	      $scope.AddProfile = {};
	  }
	  
	  $scope.loadData = function(){
	    $crudService.getCollection().then(function(response) {
			$scope.Profiles = response.data.customer;
			console.log($scope.Profiles)
		});
	  }
	    
	 $scope.edit = function(index){
	    $scope.entity = {}
	   $scope.entity = $scope.Profiles[index];
	   $scope.entity.index = index;
	   $scope.entity.editable = true;
	 }
	    
	 $scope.delete = function(index, data){
	   $crudService.deleteEntity(data).success(function(data) {
	        $scope.Profiles.splice(index,1);
	       $scope.success = 'Success';
	       $scope.error = false;
		}).error(function(data) {
	        $scope.loadData();
	       $scope.error = data.reasons;
	       $scope.success = false;
	    });
	 }
	    
	 $scope.save = function(index, id){
	   $scope.Profiles[index].editable = false;
	   $crudService.updateEntity($scope.Profiles[index], id).success(function(data) {
	       $scope.success = 'Success';
	       $scope.error = false;
	       $scope.displayForm(false);
		}).error(function(data) {
	       $scope.error = data.reasons;
	       $scope.success = false;
	    });
	   
	 }
	 
	$scope.loadData();	
	    
	 $scope.post = function(){
	   $crudService.postEntity($scope.AddProfile).success(function(data) {
	       $scope.showForm = false;
	       $scope.success = 'Success';
	       $scope.error = false;
	       $scope.loadData();
		}).error(function(data) {
	       $scope.error = data.reasons;
	       $scope.success = false;
	    });
	 }
	}
]);