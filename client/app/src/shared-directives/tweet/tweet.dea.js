'use strict';

angular.module('dsTmApp.components')
  .directive('dsTmTweet', function() {
    return {
      templateUrl: 'src/shared-directives/tweet/tweet.dea.html',
      restrict: 'EA',
      scope: {
        model: '=',
        showCtrl: '@'
      },
      controller: 'TweetCtrl'
    };
  })
  .controller('TweetCtrl', function($scope, $firebaseObject, $firebaseArray, TM_REF) {
    $scope.makeUnanswered = function(tweet) {
      var ref = new Firebase(TM_REF.TWEETS + '/' + tweet.$id);
      ref.update({answered: 0});
    };

    $scope.makeAnswered = function(tweet) {
      var ref = new Firebase(TM_REF.TWEETS + '/' + tweet.$id)
      ref.update({answered: 2});
    };

    $scope.isAnswered = function() {
      return $scope.model && $scope.model.answered && $scope.model.answered == 2;
    };

    $scope.isBeingAnswered = function() {
      return $scope.model && $scope.model.answered && $scope.model.answered == 1;
    };
  });
