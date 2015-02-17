/*jshint expr: true*/

import {base} from '/js/base/base.js';
import {router} from '/js/router/router.js';
import {breadcrumb} from '/js/breadcrumb/breadcrumb.js';

angular.bootstrap(document.body, [
    base.name
  , router.name
  , breadcrumb.name
]);
