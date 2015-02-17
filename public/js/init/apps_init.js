"use strict";
 export var apps = {
    breadcrumb: function () {
      return angular.module ('breadcrumb', []);
    }
    , base : function(){
      return angular.module ('base', []);
    }
    , router: function () {
      return angular.module ('router', ['ui.router']).config([
        '$stateProvider'
        , function($stateProvider) {
          $stateProvider.state ('root', {
            url: '/'
            , templateUrl: 'index.html'
          });
        }]);
    }
  };
