"use strict";
export var HeaderController = [ '$scope', function($scope){
  this.text = "testing";
  this.href = "/";

  $scope.HeaderController = this;
  return $scope.HeaderController;
}];