'use strict';

angular
  .module('dsTmApp')
  .constant('TM_stateConst', {
    RT: 'rt',
    WORKSPACE: 'rt.workspace',
    QUEUE: 'rt.queue'
  })
  .config(function ($stateProvider, $urlRouterProvider, TM_stateConst) {
    $urlRouterProvider
      .when('/', '/queue')
      .otherwise('/');

    // Now set up the states
    $stateProvider
      .state(TM_stateConst.RT, {
        url: '/',
        templateUrl: 'src/layouts/main.layout.html',
        controller: 'MainLayout'
      })
      .state(TM_stateConst.WORKSPACE, {
        url: '^/workspace',
        templateUrl: 'src/layouts/workspace/workspace.layout.html',
        controller: 'WorkspaceLayout'
      })
      .state(TM_stateConst.QUEUE, {
        url: '^/queue',
        templateUrl: 'src/layouts/queue/queue.layout.html',
        controller: 'QueueLayout'
      });
  });