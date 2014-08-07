app.service('crudService', ['$http',
	function($http) {
		'use strict';
		var base = 'http://gedesumawijaya.kd.io/SlimCRUDClient/vendor/slim/slim/customer/d2ba5ac651d985a7fad886044d92b5cd';
		this.getCollection = function() {
			return $http({
				method: 'GET',
				url: base
			})
				.success(function(data) {
					return data;
				})
				.error(function(data) {
					return data;
				});
		};

		this.getEntity = function(id) {
			return $http({
				method: 'GET',
				url: base +'/'+ id
			})
				.success(function(data) {
					return data;
				})
				.error(function(data) {
					return data;
				});
		};

		this.postEntity = function(param) {
			return $http({
				method: 'POST',
				url: base,
				data: param,
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.success(function(data) {
					return data;
				})
				.error(function(data) {
					return data;
				});
		};

		this.updateEntity = function(param,id_customer) {
			return $http({
				method: 'PUT',
				url: base +'/'+id_customer,
				data: param,
				headers: {
					'Content-Type' : 'application/json'
				}
			})
				.success(function(data) {
					return data;
				})
				.error(function(data) {
					return data;
				});
		};

		this.deleteEntity = function(param){
			return $http({
				method:'DELETE',
				url: base +'/'+param.id_customer,
				data:param,
				headers: {
					'Content-Type' : 'application/json'
				}
			})
			.success(function(data){
				return data;
			})
			.error(function(data){
				return data;
			});
		};

		return this;
	}
]);