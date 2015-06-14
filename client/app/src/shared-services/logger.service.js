'use strict';

angular.module('dsTmApp.components')
  .service('Logger', function($log, TmToastT, $translate) {
    this.logSuccess = function(successMessage) {
      return function(resp) {
        if (angular.isObject(successMessage)) TmToastT.succ(successMessage.message, successMessage.params);
        else if (successMessage) TmToastT.succ(successMessage);

        return resp;
      };
    };

    this.logError = function(failMessage) {
      return function(err) {
        if (angular.isObject(failMessage)) {
          $log.debug($translate.instant(failMessage.message, failMessage.params), err);
          TmToastT.err(failMessage.message, failMessage.params);
        }
        else {
          $log.debug(failMessage, err);
          TmToastT.err(failMessage);
        }

        throw err;
      };
    };

    this.log = function(promise, successMessage, failMessage) {
      return promise
        .then(this.logSuccess(successMessage))
        ['catch'](this.logError(failMessage));
    };
  });