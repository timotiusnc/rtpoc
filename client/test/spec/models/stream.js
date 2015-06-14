'use strict';

describe('Model: Stream', function () {
  // load the service's module
  beforeEach(module('dsTmApp.models'));

  // instantiate service
  beforeEach(inject(function () { }));

  it('should exists');

  it('check initial parameter');

  it('should throw various error when setStreamConfig is called with err params');

  it('should call API when saveStreamConfig');

  it('should not call API when saveStreamConfig with localOnly flag');

  it('should return isSavingStreamConfig when saving');

  it('should return isConfigured true after settingStream & vice versa');

  it('should return isLoadingStreamItems when loading stream items');

  it('should have the stream items after loading stream items');
});