'use strict';

angular.module('dsTmApp.screens')
.controller('WorkspaceLayout', function($timeout, $scope, $firebaseObject, $firebaseArray, TM_REF) {
  var tweetsRef = new Firebase(TM_REF.TWEETS);
  var tweetRef = null;
  $scope.tweet = null;
  $scope.isTweetLoading = true;
  $scope.answerTweet = answerTweet;
  $scope.response = {name: '', message: ''}

  getUnansweredTweet();

  function getUnansweredTweet() {
    $scope.isTweetLoading = true;
    //tweetsRef.on('child_added', tweetAdded);
    tweetsRef.orderByChild('answered').startAt(null).endAt(0).limitToFirst(1).once('child_added', tweetAdded);
  }

  function tweetAdded(data, prev) {
    tweetRef = new Firebase(TM_REF.TWEETS + '/' + data.key());
    $scope.tweet = $firebaseObject(tweetRef);
    $scope.tweet.$loaded()
      .then(function(data) {
        $scope.isTweetLoading = false;
        markAsBeingProcessed(data);
      })
      .catch(function(e) {
        console.log(e);
      });
  }

  function markAsBeingProcessed(tweet) {
    tweet.answered = 1;
    tweet.$save();
  }

  function answerTweet() {
    $scope.tweet.answered = 2;
    $scope.tweet.response = $scope.response;
    $scope.response = {name: '', message: ''}
    $scope.tweet.$save();

    getUnansweredTweet();
  }

  angular.element(window).bind('unload', function(e) {
    if ($scope.tweet.answered == 1) {
      $scope.tweet.answered = 0;
      $scope.tweet.$save();
    }
  });
});
