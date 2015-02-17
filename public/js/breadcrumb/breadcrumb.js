"use strict";
import {apps} from '/js/init/apps_init.js';
import {BreadcrumbController} from '/js/breadcrumb/controllers/breadcrumb.controller.js';

  export var breadcrumb = apps.breadcrumb().
    controller('BreadcrumbController', BreadcrumbController);
