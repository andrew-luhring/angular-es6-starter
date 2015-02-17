"use strict";
export var BreadcrumbController = [ '$scope', function($scope){
  this.bd = $scope;
  this.test = function(){};

  $scope.BreadcrumbController = this;
  return $scope.BreadcrumbController;
}];