'use strict';

angular.module('dsTmApp.components')
  .directive('dsTmTweet', function() {
    return {
      templateUrl: 'src/shared-directives/tweet/tweet.dea.html',
      restrict: 'EA',
      scope: {
        model: '='
      },
      controller: 'TweetCtrl'
    };
  })
  .controller('TweetCtrl', function($scope, $firebaseObject, TM_REF) {
    $scope.makeUnanswered = function(tweet) {
      var ref = new Firebase(TM_REF.TWEETS + '/' + tweet.$id + '/answered');
      var tweetObj = $firebaseObject(ref);
      tweetObj.$remove();
    };

    $scope.makeAnswered = function(tweet) {
      var ref = new Firebase(TM_REF.TWEETS + '/' + tweet.$id + '/answered');
      var tweetObj = $firebaseObject(ref);
      tweetObj.answered = true;
      tweetObj.$save();
    };
  });
