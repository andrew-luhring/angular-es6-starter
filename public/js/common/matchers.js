
define([
  'lodash'
], function(_) {
  "use strict";
  var jasmine = jasmine || {};

  function Matchers(obj){
    this.jasmine = obj;
  }

  /**
   * toBeTypeOf matcher for jasmine;
   * @example var o = {}; expect(o).toBeTypeOf('object');
   *
   * @param expected
   * @returns {boolean}
   */
  Matchers.prototype.toBeTypeOf = function(expected) {
    this.message = function(){
      return '\n====>' + this.actual + '  is not a type of ' + expected + '\n';
    };
    return typeof this.actual === expected;
  };
  /**
   * toExist matcher for jasmine - returns true if not null, undefined or empty.
   * @example var o = {}; expect(o).toExist();
   *
   * @param expected
   * @returns {boolean}
   */
  Matchers.prototype.toExist = function(){
    this.message = function(){
      return '\n====> whatever this is: ' + this.actual + ' does not exist.' + '\n';
    };
    var obj = {}
      , val = this
      , actual = this.actual;

    if(typeof this.actual === 'undefined'){
      return false;
    }
    else if(this.actual === null){
      return false;
    } else if( this.actual === ''){
      return false;
    }
    else {
      return true;
    }
  };
  /**
   * toRespondTo matcher for jasmine- returns true if object has method.
   * @example var o = { derp : function(){} } expect(o).toRespondTo('derp');
   *
   * @param expected
   * @returns {boolean}
   */
  Matchers.prototype.toRespondTo = function(expected){
    var type = (typeof this.actual === 'object') ? true : false;
    if(type !== true ){
      this.message = function(){
        return '\n====>' + this.actual + ' is not a method of of ' + expected + '\n';
      };
    }
    var assertion = (typeof this.actual[expected] === 'function') ? true :false;
    var both = (type === true && assertion === true) ? true : false;
    return assertion;
  };

  Matchers.prototype.toBeInstanceOf= function(expectedInstance) {
    var actual = this.actual;
    var notText = this.isNot ? " not" : "";
    this.message = function() {
      return "\n====>Expected " + actual.constructor.name + notText + " is instance of " + expectedInstance.name;
    };
    return actual instanceof expectedInstance;
  };
  Matchers.prototype.toContainValue= function(expected){
    var  type = (typeof this.actual === 'object') ? true : false
      , validResult;

    if(type === false ){
      this.message = (function(obj){
        return "\n====>Expected an array or object, got " + typeof obj + " instead";
      })(this.actual);

      throw new Error(this.message());
    } else {
      // null is an object but it's the only object that is not an instanceOf Object.
      var nullCheck = this.actual;
      if(nullCheck instanceof Object === false){
        this.message = (function(obj){
          return "\n====>Expected an array or object, got null instead: " + obj;
        })(this.actual);
        throw new Error(this.message());
      }
    }

    validResult = _.contains(this.actual, expected);
    return validResult;
  };
  Matchers.prototype.toContainKey = function(expected){
    var  type = typeof this.actual === 'object'
      , isArray = this.actual instanceof Array
      , isNull = this.actual instanceof Object === false
      , result;

    if(type === false ){
      this.message = (function(obj){
        return "\n====>Expected an object, got " + typeof obj + " instead";
      })(this.actual);
      throw new Error(this.message());
    } else if( isArray === true) {
      this.message = (function(obj){
        return "\n====>Expected an object, got an array instead: " + obj;
      })(this.actual);
    } else if (isNull === true){
      this.message = (function(obj) {
        return "\n====>Expected an object, got null instead: " + obj;
      })(this.actual);
    } else {
      for (var i in this.actual){
        if(i === expected){
          return true;
        }
      }
    }
  };
  Matchers.prototype.toContain = function(expected) {
    var containValue = Matchers.prototype.toContainValue
      , containKey = Matchers.prototype.toContainKey
      , resultValue
      , resultKey;
    this.message = function(){
      if(this.actual instanceof Array ){
        return "\n====>Expected the array:\n"+ this.actual + " \nto contain " + expected;
      } else {
        return "\n====>Expected the object with the keys:" +
          "\n\n"+ _.keys(this.actual) + "\n\nto either contain the key: " +
          "\n" + expected + "" +
          "\n\nor one of the values:" +
          "\n\n" + _.values(this.actual) + " \n\nto be: " +
          "\n" + expected;
      }
    };
    if(this.actual instanceof Array ){
      resultValue = containValue.call(this, expected);
      return resultValue;
    } else {
      resultKey = containKey.call(this, expected);
      resultValue = containValue.call(this, expected);
    }


    if(resultValue === true || resultKey === true){
      return true;
    } else {
      return false;
    }
  };
  return new Matchers(this);
});
