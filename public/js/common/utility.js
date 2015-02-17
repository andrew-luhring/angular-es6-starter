  /*jshint expr: true*/
  // TODO

  define (['jquery'], function ($) {
    "use strict";

    function Utility(){
      var derp = "4";
  // todo: refactor this if else to a switch.
      /**
       * returns a call to the function passed to it or returns a log of the action passed to it.
       * @private
       *  @desc this is a long unnecessary version of "execute a callback if it exists, log a string or return fail if it's supposed to fail"
       * @param action { function | string }
       * @param fail
       * @returns {*}
       */
      function finished(action, fail){
        if(action && typeof action === 'function'){
          if(typeof fail === 'object'){
            return {
              action : (function(){
                action();
              })()
              ,   obj : fail
            };
          } else {
            action();
            return true;
          }
        } else if(action && typeof action === "string") {
          return action;
        }else if(typeof action === 'undefined'){
          if(typeof fail === 'object'){
            return fail;
          } else{
            return true;
          }
        } else {
          if(fail && typeof fail === "boolean"){
            console.warn(action);
            return fail;
          } else {
            throw "your action failed AND you passed a " + typeof fail + " rather than a boolean; \nstep your game up.";
          }
        }
      }
    }

    /**
     *  Generate an exception.
     * @param message
     * @param type
     * @param isFatal
     * @constructor
     */
    Utility.prototype.Exception = function(type, message, isFatal){
      var obj = {};
      if(type && message){
        obj.name = type;
        obj.message = message;
      } else {
        throw new Error("a FATAL exception has occured AND even the Exception was called wrong.\n type is: "+ type + "\n message is: " + message + "\nWhat are you doing with your life? Step your game up.");
      }
      if(isFatal === true){
        var error = new Error("type : " + obj.name + "\n"  + obj.message);
        throw error;
      }
      return new Error(obj.name + " : " + obj.message);
    };

    /**
     * log to html or console the keys and values of an object.
     * @param {object}
     * @param {boolean} - shouldLog
     * @param {boolean} generate html
     * @returns {Function|boolean|*}
     */
    Utility.prototype.keysVals = function (object, shouldLog, toHtml) {
      var obj = object
        ,   mode = shouldLog;

      // TODO: dry this up and add unit tests.
      function log (thing, _mode, toHtml ) {

        // if browser window
        // and thing is:
        // not silent,
        // a string,
        // should be converted to html : create a div, insert thing as a text node, send div to returnResult
        if(window.document  && _mode === true  && typeof thing === 'string' && toHtml === true ){
          var textNode = document.createTextNode(thing)
            , divNode = document.createElement("div");
          divNode.appendChild(textNode);
          returnResult(divNode, true);

          // if thing is:
          // not silent,
          // a string
          // falsy toHtml value
          // should NOT be converted to html : send returnResult the string
        } else if (_mode === true && typeof thing === 'string' && !toHtml) {
          returnResult(thing, toHtml);

          // if thing is:
          // not silent
          // BUT thing is NOT a string
          // this is a type error
        } else  if (_mode === true && typeof thing !== 'string'){

          var err = new Utility.Exception(false, 'Standard Error', 'you called keysVals and passed in ' + thing + ' which is not a string');
          console.error(err.name, err.message);
          returnResult(false);

          // if thing is:
          // SILENT
          // NOT a string
          // this is a FATAL error
        } else if (typeof thing !== 'string'){
          var FATAL = new Utility.Exception(true, 'Dangerously Silent Error', ' you called keysVals with silent mode on and passed in ' + thing + ' which is not a string!');

          // if thing is:
          // silent
          // string
          // all is fine,just return true.
        } else {
          obj.test = true;
        }
      }
      function returnResult(thing, isHtml){
        // if thing isn't html but is ok, add to obj.test array
        if(isHtml !== true && typeof thing === 'string'){

          obj.test += thing;
          // if thing is html and the elements' first child is text
        } else if (isHtml === true && thing.firstChild.nodeName === '#text'){
          obj.test += thing;
        } else if(thing === false){
          obj.test = false;
        }
      }
      for (var i in object) {
        if (obj.hasOwnProperty (i)) {
          var str = i + " :  " + obj[i];
          log (str, mode, toHtml);

          for (var j in object[ i ]) {
            if (obj.hasOwnProperty (j)) {
              var str2 = "      " + j + " : " + object[ i ][ j ];
              log (str2, mode, toHtml);
              obj.test = "word";
              obj.toString ("\n" + j + " : " + object[ i ][ j ]);
            }
          }
        }
      }
      return obj.test;
    };

    /**
     *
     * @param {string} -  id - id of actual div
     * @param {}  - shouldReturnActualDiv -
     * @returns {*}
     */
    Utility.prototype.testDiv = function newDiv(id, shouldReturnActualDiv){
      if(!window || !document.body){ return Utility.Exception("windowError", "this isn't being called in the context of a browser");}
      var createDiv = document.createElement('div')
        , body= document.body
        , _testDiv;

      createDiv.id = id;
      _testDiv = body.appendChild(createDiv);

      if(!shouldReturnActualDiv){
        return _testDiv.id;
      } else {
        return _testDiv;
      }
    };

    /**
     *  will log to console by default. will log to object created from string if one is passed. will silently 'log' if silent is true.
     * @param thingToLog    -    {string}
     * @param logToDom  -   {string}    :   will automatically create a new one with the string logToDom.
     * @param silent    -   {boolean}
     * @returns {boolean}
     */
    /**
       * will log to console by default. will log to object created from string if one is passed. will silently 'log' if silent is true.
       * @param {string} - thingToLog - message to log
       * @param {boolean} - silent - (mode) if silent is true, don't log
       * @param isError
       */
    Utility.prototype.log = function log(thingToLog, silent, isError){
      if(isError === true){
        console.warn(thingToLog);
      } else {
        if(!silent || silent === false){
          // this is a function to generate console.log  for
          // tests dynamically.
          console.log( thingToLog );
        }
      }
      return "logged";
    };

    /**
     *  will log to a dynamically inserted dom element by default.
     * @param isError   -   { boolean }
     * @param thingToLog    -   {string}
     * @param logToDomObj   -   { string }
     * @returns {Array}
     */
    Utility.prototype.logDom = function(thingToLog, logToDomObj, isError){

      if(typeof thingToLog !== 'string'){ return Utility.Exception('typeError', 'thingToLog is not a string!');}
      if(typeof logToDomObj !== 'string' && typeof logToDomObj !== 'object'){ return Utility.Exception('typeError', 'logToDomObj is neither a string, nor an object!');}
      if(typeof isError && typeof isError !== 'boolean'){ return Utility.Exception('typeError', 'isError exists but is not a boolean!');}

      var logged = []
        ,      selector = (logToDomObj instanceof $) ? logToDomObj.selector : "#"+logToDomObj
        ,      id = '#' + Utility.testDiv(logToDomObj);
      // checks to make sure it's been inserted into dom correctly by making sure the text is the same as
      // thingToLog text and that the id returned by testDiv is the same as the one passed to it.
      $(id).text(thingToLog);
      logged.push(($(selector).text() === thingToLog) ? true : false);

      if(isError === true){
        $(id).addClass("error");
        logged.push(($(selector).hasClass("error") === true) ? true : false);
      }
      return logged;
    };
    /**
     * isStringBoolean
     * @param str
     * @returns {*}
     */
    Utility.prototype.isStringBoolean = function(str) {
      if (str === "true") {
        return true;
      } else if (str === "false") {
        return false;
      } else if (typeof str === 'boolean') {
        return str;
      } else {
        alert("what");
        throw new Error("not string true or false: " + str);
      }
    };

    return new Utility();
  });
