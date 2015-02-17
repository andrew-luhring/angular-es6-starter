"use strict";
class Link{
  constructor(name, href, text){
    this.name = name;
    this.href = href;
    this.text = text ||  this.name;

  }
}

export var NavController = ['$scope', function($scope){

  let home = new Link('home', '/', 'Home');


  this.links = [
    home
  ];

  $scope.NavController = this;
  return $scope.NavController;
}];
