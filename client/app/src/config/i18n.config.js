'use strict';

angular
  .module('dsTmApp')
  .config(function ($translateProvider, TM_lang) {
    $translateProvider.preferredLanguage(TM_lang.en);
  });