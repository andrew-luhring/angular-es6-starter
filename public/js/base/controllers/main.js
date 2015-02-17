"use strict";
class Page{
  constructor(header, content){
    this.header = header;
    this.content = content;
  }
}
export var MainController = [ '$scope', function($scope){
  var page = new Page('This is a header', '<div><strong>with</strong>this content</div>');

  this.page = page;

  $scope.HeaderController = this;
  return $scope.HeaderController;
}];
