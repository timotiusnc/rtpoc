'use strict';

angular
  .module('dsTmApp', [
    'dsTmApp.screens',
    'dsTmApp.models',
    'dsTmApp.components',
    'dsTmApp.i18n',
    'dsTmApp.ext.lodash',
    'dsTmApp.ext.jquery',
    'angucomplete-alt',
    'ngSanitize',
    'ngMessages',
    'ngCookies',
    'infinite-scroll'
  ])
  .run(function() {
  });
