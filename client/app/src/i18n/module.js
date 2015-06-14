'use strict';

/**
 * @ngdoc function
 * @name dsTmApp.config:translation id
 * @description
 * Indonesian translation
 */

angular.module('dsTmApp.i18n', [
    'pascalprecht.translate',
  ])
  .constant('TM_lang', {
    en: 'en',
    id: 'id'
  });
