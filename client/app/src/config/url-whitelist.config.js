'use strict';

angular
  .module('dsTmApp')
  .config(function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data):/);
  });