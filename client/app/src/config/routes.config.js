'use strict';

angular
  .module('dsTmApp')
  .constant('TM_stateConst', {
    OMBAQ_RT: 'ombaq_rt',
  })
  .config(function ($stateProvider, $urlRouterProvider, TM_stateConst) {
    $urlRouterProvider
      .otherwise('/');

    // Now set up the states
    $stateProvider
      .state(TM_stateConst.OMBAQ_RT, {
        url: '/',
        templateUrl: 'src/layouts/main.layout.html',
        controller: 'MainLayout'
      });
  });