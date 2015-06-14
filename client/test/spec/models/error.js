'use strict';

describe('Model: Error', function () {

  // load the service's module
  beforeEach(module('dsTmApp.models'));

  // instantiate service
  var Error;
  beforeEach(inject(function (_Error_) {
    Error = _Error_;
  }));

  xit('should do something', function () {
    expect(!!Error).toBe(true);
  });

});
