
import {apps} from '/js/init/apps_init.js';
import {HeaderController} from '/js/base/controllers/header.js';
import {NavController} from '/js/base/controllers/nav.js';
import {MainController} from '/js/base/controllers/main.js';

export var base = apps.base().
  controller('MainController', MainController).
  controller('HeaderController', HeaderController).
  controller('NavController', NavController);
