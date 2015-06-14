'use strict';

/**
 * Loadable wraps a value in a context of 'this value is loading'.
 * Basically, like a promise but it caches the last return value & 
 * has the interface to know whether it is loading or not.
 *
 * We wrap this in a model because there's a lot of xxxPromise-followed-by-isxxx
 * pattern.
 */
angular.module('dsTmApp.models')
  .factory('Loadable', function (_, $q) {
    var Loadable = function(val) {
      this._val = val;
      this._lastPromise = $q.when(val);
      this._lastPromise.done = true;
      this._err = null;
      this._isErr = false;
    };

    Loadable.prototype.isPending = function() {
      return !this._lastPromise.done;
    };

    Loadable.prototype.error = function(newErr) {
      this._err = newErr === undefined ? this._err : newErr;
      return this._err;
    };

    Loadable.prototype.asPromise = function(resolveNested) {
      return this._lastPromise.then(function(x) {
        return  !resolveNested  ? x :
                _.isArray(x)    ? Loadable.resolveLoadables(x, resolveNested) :
                x;
      });
    };

    Loadable.prototype.value = function(newVal) {
      this._val = newVal === undefined ? this._val : newVal;
      return this._val;
    };

    Loadable.prototype.isError = function(newIsErr) {
      this._isErr = newIsErr === undefined ? this._isErr : newIsErr;
      return this._isErr;
    };

    // (a -> Promise a) -> Loadable a
    // f is a function that takes one argument (a value of this loadable instance)
    // and returning value that will be cached by the loadable (via applyValue(this))
    Loadable.prototype.then = function(f) {
      this._lastPromise =
        this._lastPromise
            .then(f)
            .then(applyValue(this))
            ['catch'](applyError(this));


      this._lastPromise
          ['finally'](markDone(this._lastPromise));

      return this;
    };

    // (a -> Promise a) -> Loadable a
    // We use nthen to first catch any error from previous promise to make sure
    // the 'then' is executed.
    // If we don't catch when there's any error, the 'then' in any future promise will not be executed
    Loadable.prototype.nthen = function(f) {
      var _this = this;
      this._lastPromise = 
        this._lastPromise['catch'](function() { return _this.value(); }); // neutralize last error

      return this.then(f);
    };

    // (a -> Promise a) -> Loadable a
    // This is a declaration so that Loadable has public method 'catch' (just like promise)
    // We use this because Loadable is not a promise, the real promise is this._lastPromise
    Loadable.prototype['catch'] = function(f) {
      this._lastPromise =
        this._lastPromise
            ['catch'](f)
            ['catch'](applyError(this))
            .then(applyValue(this));
            
      this._lastPromise
          ['finally'](markDone(this._lastPromise));

      return this;
    };

    // (a -> Promise a) -> Loadable a
    Loadable.prototype.ifnThen = function(f) {
      return this.isPending() ? this : this.nthen(f);
    };

    // [a] -> [Loadable a]
    Loadable.toLoadables = function(arr) {
      return _.map(arr, function(a) {
        return new Loadable(a);
      });
    };

    // [Loadable a] -> Promise [a]
    Loadable.resolveLoadables = function(xsL, resolveNested) {
      var xPs = _.map(xsL, function(xL) { return (xL.asPromise || _.constant(xL)).bind(xL)(resolveNested); }); // turn all loadables into promise
      return $q.all(xPs); // resolve all of them
    };

    // Loadable a -> (a -> Promise a)
    var applyValue = function(loadable) {
      return function(val) {
        loadable.isError(false);
        return loadable.value(val);
      };
    };

    // Loadable a -> (a -> Promise a)
    var applyError = function(loadable) {
      return function(err) {
        loadable.isError(true);
        return $q.reject(loadable.error(err));
      };
    };

    var markDone = function(promise) {
      return function() {
        promise.done = true;
      };
    };

    return Loadable;
  });
