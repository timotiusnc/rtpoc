'use strict';

angular
  .module('dsTmApp')
  .config(function ($logProvider) {
    // Configure debug - make it log when the debug key is not 'true' or unchanged
    var debugKey = 'DS_CONF_VAL(LOG_DISABLED)';
    var isDebugKeyUnchanged = debugKey.indexOf('LOG_DISABLED') >= 0;
    var debugEnabled = isDebugKeyUnchanged || (debugKey !== 'true');
    $logProvider.debugEnabled(debugEnabled);
  });