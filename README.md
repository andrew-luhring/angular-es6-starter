<main>
 <header>

# Conventions:

 </header>
 <section>
  <header>

### All front-end code

  </header>
  <section>
    <header>
      <h4>General </h4>
    </header>

+ Must be [web standards model](http://www.w3.org/wiki/The_web_standards_model_-_HTML_CSS_and_JavaScript) compliant.
+ Should not mix back-end with front-end. **Java code must NOT be mixed with JavaScript code.**
  + Strip Java code out when you see it, back-end data should be served to the front-end via JSON or JSP.
  + If you're not a back-end developer, and you see Java code mixed in with JavaScript code, ask a back-end dev for help refactoring it.

   </section>
   <section>
  <section>
   <header>

#### JavaScript:

   </header>

+ We use [this](https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml) standard. except for the 80 column limit (use 100).
+ [This](https://github.com/angular/angular.js/wiki/Best-Practices) too.
+ If your editor supports it (most do)- make use of the .editorconfig file. See: [editorconfig.org](http://editorconfig.org/). If you use webstorm, get the editorconfig plugin.
+ You will be allowed to use [es6](http://www.es6fiddle.net/) syntax soon when we add [traceur ](https://github.com/google/traceur-compiler).
+ Do not use javascripts' native eval() (angulars' is ok).
+ **use the jshint grunt task to lint your js.**
+ We're using [Require.js](http://requirejs.org/docs/api.html) to manage js dependencies. See note at end of readme for example.
+ Use ["strict mode"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode).

##### Angular
+ **Do not use ngStyle.**
+ Keep business logic out of html.
+ If you're going to use a lot of the following attributes on elements, it might be easier and cleaner to write a custom directive:
  + ng-blur
  + ng-change
  + ng-focus
  + ng-click
  + ng-show
  + ng-hide
  + ng-keypress/up/down
  + ng-mouse\*

  </section>
  <section>


#### Tests:

+ one+ test file per corresponding front-end javascript file.
+ tests are prepended with a "_"
+ folder structure in ``` test/ ``` matches the folder structure in ``` public/ ```.
  + So if you're testing
  ``` /js/ (x) /file.js ```,
  your tests should be:
  ``` /tests/unit/ (x) /_file.js ```
  ``` /tests/midway/ (x) /_file.js ```
  ``` /tests/e2e/ (x) /_file.js ```
+ Use [karma](http://karma-runner.github.io/) for unit / midway tests; [protractor](https://docs.angularjs.org/guide/e2e-testing) for e2e tests.
+ Use [jasmine](http://jasmine.github.io/2.0/introduction.html) for unit tests. If you write any [custom matchers](http://jasmine.github.io/2.0/custom_matcher.html) make sure to document with jsdoc. If you develop a few that are particularly useful, create a custom matchers utility file, document them so we can all benifit :-)

  </section>

 </section>


 <section>

<aside>
#### Key:
 <dl>
  <dt> "|=>" means</dt>
  <dd>

 [file]()  invokes
 &nbsp; &nbsp; |=> [another file]() &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;  [and [another file ]() has [these dependencies]() ]

  </dd>
  <dt>indentation implies a 'step into' the next file in the cascade.</dt>
  <dd>ex.

[main.js]()
&nbsp; |=> [file.js]() invoked via "[main.js]()"
&nbsp; |=> [another.js]() also invoked in [main.js]()
&nbsp; &nbsp; &nbsp; &nbsp; |=> [another-another.js]() invoked in "[another.js]()"
&nbsp; |=> [yet-another.js]() which is also invoked by "[main.js]()"

  </dd>
 </dl>
</aside>
  <header>

# Require's Cascade / Load order

  </header>
```

    main.js
      |=> jquery_bootstrap.js       [jquery]
      |=> apps_bootstrap.js         [angular]
          |=> apps_init                 [angular]

```


</section>
<section>
<header>
  # Code Flow:
</header>
(Order of **execution**).

| File_name | Exports | Purpose |
|---------- |:-------------|:-------|
| apps_init | apps.{module} |  where angular modules are first defined / configured / instantiated |
| {application} | { application } | {whatever the angular application does} |
| apps_bootstrap | angular object | file responsible for actually bootstrapping (starting) configured angular applications  |



```
  main.js --> apps_bootstrap.js --> registration.js  --> apps_init

```

<aside>
#### Key:
 <dl>
  <dt> "-->" means</dt>
  <dd>
  Process / Thread of execution. Line break signifys different process.
  Note: While the processes are different, MAY be  ([and in most cases is](http://www.devbridge.com/articles/understanding-amd-requirejs/)) happening asynchronously.


  Ex.
  <pre>
[First process: ]()    first.js --> second.js --> third.js --> etc.
[Second process:]()    first.js --> second.js --> third.js --> etc.
  </pre>
  </dd>
 </dl>
</aside>



</section>
<section>



# File structure

| directory | purpose | special note |
|:---|:----|:---|
| /config/ | configuration files for test runners. | |
| /tests/ | where test files go | test directory mirrors public/js directory. |
| lib/ | external library files go here | dependencies are installed / managed with [bower](http://bower.io/) |
| js/ |  this is where all fabory/grainger javascript files that touch the front-end of the site go. | |


```
config/
   karma.conf.js
   protractor.conf.js
tests/
   test-main.js (where you define paths to your js files for testing)
   results/
       units.html (unit test html gets output here; currently broken).
       coverage/ (code test coverage reports get generated here; currently also broken)
   unit/
   e2e/
   midway/
node_modules/
main.js (where you define paths to your js files for prod)
 lib/
     (framework)/
 js/
     (folder dictates app/section)
 less/
 css/
```

## Using Require.js TLDR version

Require.js is awesome and simple. There are two aspects of it:

1. All of your Javascript files.
2. Main.js file


Your javascript files basically just need to do this:


### js/example/fileUnderTest.js :
```js

define([
    'jQuery'
  , 'testsE/dependencyA'       // example- could export a function that accepts a number as a parameter. that function returns the parameter multiplied by 2.
  , 'testsE/dependencyB'       // can export a number, an object, whatever. lets say it exports an object with a property num that equals 9.

  ] , function(jquery, aliasForDepA, aliasForDepB){
  "use strict";

  var result = aliasForDepA(4) + aliasForDepB.num
  , $ = jquery;

  console.log( aliasForDepA(4) );
  // logs 8.

  console.log(aliasForDepB.num) ;
  // logs 9.

  console.log( result );
  // logs 17

  $(document).ready(function($){
    $("output").text(result);
  });

  return result;
});

```

this makes everything easier- to test all you have to do is:

### js/tests/example/_fileUnderTest.js:

```js
define(['testE/fileUnderTest' ], function(fut){
  "use strict";

  describe("File being tested", function(){
    it("will return 17.", function(){
      expect(fut).toBe(17);
    });
  });
});

```

### js/tests/example/_dependencyA.js:
```js

define(['testE/dependencyA'], function(depA){

  describe("dependencyA", function(){
    it("will multiply the parameter passed to it by 2.", function(){
      var example = depA(10)
      , example2 = depA(2)
      , example3 = depA('string');

      expect(example).toBe(20);
      expect(example2).not.toBe(5);
      expect(example3).toBe(NaN);
    });
  });
});

```

## Main.js
The main.js file houses all of the paths to your AMD compatible js files (aka files wrapped in a define function. We'll cover that in a minute).
It looks like this.

```js

requirejs.config({
 paths: {
    "alias": 'path/to/directory'               // example:
 ,  "testE": '\tests/example'                  // this allows you to include files from the directive's directory by simply using "regD/file.directive" rather than "js/registration/directives/file.directive"
 ,  "jquery": "lib/jquery"            // this allows you to include the angular library simply by using "angular"
 }
, shim: {                                                   //used to load files that are NOT amd compatible
    (nonAmdFile): {
      dep : [
        dependency1
      , dependency2
      ]
    , exports : "thing"
    }                  // example:
    angular : {
      exports: "angular"
    }
  , mocks : {
      deps: ["angular"]
   ,  exports: "angular.mock"
    }
  }
  // , ...other require properties... ; but those ^ are the main two (pun not intended but is relevant so I'm not ashamed) .
});

```


Angular specific:
One very important aspect of our setup is that each of our RequireJS modules defines only one component, and that component is defined using the fully qualified array syntax.
This allows for easier testing and, more importantly protects from problems when being minified.

```js

    define(function () {

      return ['Dependency1', 'Dependency2', ... , function (Dependency1, Dependency2, ...) {
        ...
      }];
    });

```





</main>
