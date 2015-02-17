<main>
  <header>

# Bootstrapping stuff

  </header>
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

[init.js]()
&nbsp; |=> [file.js]() invoked via "[init.js]()"
&nbsp; |=> [another.js]() also invoked in [main.js]()
&nbsp; &nbsp; &nbsp; &nbsp; |=> [another-another.js]() invoked in "[another.js]()"
&nbsp; |=> [yet-another.js]() which is also invoked by "[init.js]()"

  </dd>
 </dl>
</aside>
<section>

  The way the js is pretty easy to understand if you see the dependency tree/algorithm:

```
  |=> init/apps_bootstrap.js
      |=> base/base.js                [init/apps_init.js, base/controllers/nav.js, ... etc.]
      |=> router/router.js            [init/apps_init.js]
      |=> breadcrumb/breadcrumb.js    [init/apps_init.js, breadcrumb/controllers/breadcrumb.controller.js]

  (all files are from 'js/{module-name})
```

As you can see, each module gets its' own directory within the js directory, and all components of
that module are within folders within that modules' directory:

```
js/{moduleName}
js/{moduleName}/controllers/*.js
js/{moduleName}/services/*.js
js/{moduleName}/directives/*.js

```


All the components of a module are collected into a single file at the root of the module's
directory:


```
js/{moduleName}/{moduleName}.js  <--- collects and defines all controllers, services, etc
```

When I first saw someone structure their application that way, I thought it was stupid, tedious,
and overly verbose, so I wrote it off.
And then I worked on a large project where the application was not structured this way;
All the controllers, modules, directives etc were in single gigantic files (controllers.js,
directives.js).
*It was painful.*
Never again.
Declare one component per file. It's so much easier to test and understand small chunks of stuff.
It takes 15 seconds per component to do it this way and it will save you days of scrolling, fixing
conflicts, etc.


</section>
<section>


# File structure

| directory | purpose | special note |
|:---|:----|:---|
| /config/ | configuration files for test runners. | |
| /tests/ | where test files go | test directory mirrors public/js directory. |
| /public/ | public root; everything gets served from here. |
| /public/js/ | js files |
| /public/lib/ | external library files go here | dependencies are installed / managed with [bower](http://bower.io/) |
| /public/views/ | template html files for your angular directives.|
| /public/less/ | css preprocessor|

</section>
</main>

