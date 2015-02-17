define([], function(){
"use strict";
function Helpers(devMode){
  this.dev = devMode;
}

  /**
   *  If testing routes that do full page reloads, this function allows you to
   *      pass in location changes only when this isnt being run by karma...
   *      so you don't get the 'karma did a full page reload' error;
   *      Cant get full test coverage on isKarma(); use it with a grain of salt.
   *
   * @param {object} -   isWindow - a window object
   * @param {object}  -  location - intended location/url to check
   * @returns {boolean}
   */
  Helpers.prototype.isKarma = function(isWindow, location){
  var obj;
    if(typeof isWindow === 'undefined' || typeof location === 'undefined' || typeof isWindow !== 'object' || typeof location !== 'string'){
      throw new TypeError("either isWindow or location are undefined or not the right type of thing.\nwindow should be a window: " + isWindow + "\nlocation should be a string: " + location);
    }
    obj = (document.querySelectorAll('script[src="http://karma.js"]')) ?  false : location;
  if (isWindow!==window.top) {
    return false;
  } else {
    if (window === isWindow){
      window.location = location;
      return (window.location === location )? true : false;
    }
    return obj;
  }
};

  /**
   * Simple function to set a property on an object as readonly
   * @param {object} - obj - the object whose property to add the object to.
   * @param {string} prop - property name.
   * @param {*} val - value; can be anything.
   * @returns {*} - returns an object if everything was ok, returns false / throws an error otherwise.
   */
  Helpers.prototype.readOnly = function(obj, prop, val, throwExceptionOnError){
    var rex = /([^A-z0-9_]|(\\))/g ;
    if(!obj || !prop || !val){
      throw new Error("obj: " + obj + "\nor prop: "+ prop + "\nor val: " + val + " is/are undefined");
    }
    if( typeof obj !== 'object'){
      throw new TypeError("you tried to create a read-only object, but passed a " + typeof obj + " instead");
    }
    if ( obj instanceof Array === true ){
      throw new TypeError("you tried to create a read-only object, but passed an array: " + obj + " instead");
    }
    // null check
    if (obj instanceof Object !== true){
      throw new TypeError("you tried to create a read-only object, but passed " + obj + " instead");
    }

    if( typeof prop !== 'string' ){
      throw new TypeError("you passed a " + typeof prop + ' instead of a string');
    } else if ( rex.test(prop) ){
      throw new TypeError("you passed an invalid string: " + prop + ' as a property');
    }

    Object.defineProperty(obj, prop, {
      value: val,
      enumerable: true,
      writable: false
    });

    return obj;
  };
  return Helpers;
});
