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
  .constant('TM_REF', {
    'TWEETS': 'https://dazzling-fire-5123.firebaseio.com/tweets',
    'MESSAGES': 'https://dazzling-fire-5123.firebaseio.com/messages',
  })
  .run(function() {
  });
