'use strict';

angular.module('dsTmApp.screens')
  .controller('QueueLayout', function($scope, $firebaseArray, TM_REF) {
    var ref = new Firebase(TM_REF.TWEETS);
    $scope.tweets = $firebaseArray(ref);
    $scope.isTweetLoading = true;

    $scope.tweets.$loaded()
      .then(function(tweets) {
        $scope.isTweetLoading = false;
      })
      .catch(function(e) {
        console.log(e);
      })
  });
