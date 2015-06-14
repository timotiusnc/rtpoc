"use strict";angular.module("dsTmApp.components",["angularMoment","angular.filter","infinite-scroll","dsTmApp.i18n","ngResource","firebase"]),angular.module("dsTmApp.models",["dsTmApp.ext.lodash","angularMoment"]),angular.module("dsTmApp.screens",["dsTmApp.components","ui.router"]),angular.module("dsTmApp.i18n",["pascalprecht.translate"]).constant("TM_lang",{en:"en",id:"id"}),angular.module("dsTmApp.ext.lodash",[]).constant("_",window._),angular.module("dsTmApp.ext.jquery",[]).constant("$",window.$),angular.module("dsTmApp",["dsTmApp.screens","dsTmApp.models","dsTmApp.components","dsTmApp.i18n","dsTmApp.ext.lodash","dsTmApp.ext.jquery","angucomplete-alt","ngSanitize","ngMessages","ngCookies","infinite-scroll"]).constant("TM_REF",{TWEETS:"https://dazzling-fire-5123.firebaseio.com/tweets",MESSAGES:"https://dazzling-fire-5123.firebaseio.com/messages"}).run(function(){}),angular.module("dsTmApp").config(["$translateProvider","TM_lang",function(a,b){a.preferredLanguage(b.en)}]),angular.module("dsTmApp").config(["$logProvider",function(a){var b="DS_CONF_VAL(LOG_DISABLED)",c=b.indexOf("LOG_DISABLED")>=0,d=c||"true"!==b;a.debugEnabled(d)}]),angular.module("dsTmApp").constant("amTimeAgoConfig",{preprocess:"utc"}),angular.module("dsTmApp").constant("TM_stateConst",{RT:"rt",WORKSPACE:"rt.workspace",QUEUE:"rt.queue"}).config(["$stateProvider","$urlRouterProvider","TM_stateConst",function(a,b,c){b.when("/","/queue").otherwise("/"),a.state(c.RT,{url:"/",templateUrl:"src/layouts/main.layout.html",controller:"MainLayout"}).state(c.WORKSPACE,{url:"^/workspace",templateUrl:"src/layouts/workspace/workspace.layout.html",controller:"WorkspaceLayout"}).state(c.QUEUE,{url:"^/queue",templateUrl:"src/layouts/queue/queue.layout.html",controller:"QueueLayout"})}]),angular.module("dsTmApp").config(["$compileProvider",function(a){a.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data):/)}]),angular.module("dsTmApp.i18n").config(["$translateProvider","TM_lang",function(a,b){a.translations(b.en,{})}]),angular.module("dsTmApp.i18n").config(["$translateProvider","TM_lang",function(a,b){a.translations(b.id,{})}]),angular.module("dsTmApp.screens").controller("MainLayout",["$",function(a){a(".button-collapse").sideNav(),a(".parallax").parallax()}]),angular.module("dsTmApp.screens").controller("QueueLayout",["$scope","$firebaseArray","TM_REF",function(a,b,c){var d=new Firebase(c.TWEETS);a.tweets=b(d),a.isTweetLoading=!0,a.tweets.$loaded().then(function(b){a.isTweetLoading=!1})["catch"](function(a){console.log(a)})}]),angular.module("dsTmApp.screens").controller("WorkspaceLayout",["$scope","$firebaseArray",function(a,b){}]),angular.module("dsTmApp.components").directive("dsTmTweet",function(){return{templateUrl:"src/shared-directives/tweet/tweet.dea.html",restrict:"EA",scope:{model:"="},controller:"TweetCtrl"}}).controller("TweetCtrl",["$scope","$firebaseObject","TM_REF",function(a,b,c){a.makeUnanswered=function(a){var d=new Firebase(c.TWEETS+"/"+a.$id+"/answered"),e=b(d);e.$remove()},a.makeAnswered=function(a){var d=new Firebase(c.TWEETS+"/"+a.$id+"/answered"),e=b(d);e.answered=!0,e.$save()}}]),angular.module("dsTmApp.components").constant("TM_Keycode",{SPACE:32,ENTER:13}),angular.module("dsTmApp.models").factory("Loadable",["_","$q",function(a,b){var c=function(a){this._val=a,this._lastPromise=b.when(a),this._lastPromise.done=!0,this._err=null,this._isErr=!1};c.prototype.isPending=function(){return!this._lastPromise.done},c.prototype.error=function(a){return this._err=void 0===a?this._err:a,this._err},c.prototype.asPromise=function(b){return this._lastPromise.then(function(d){return b&&a.isArray(d)?c.resolveLoadables(d,b):d})},c.prototype.value=function(a){return this._val=void 0===a?this._val:a,this._val},c.prototype.isError=function(a){return this._isErr=void 0===a?this._isErr:a,this._isErr},c.prototype.then=function(a){return this._lastPromise=this._lastPromise.then(a).then(d(this))["catch"](e(this)),this._lastPromise["finally"](f(this._lastPromise)),this},c.prototype.nthen=function(a){var b=this;return this._lastPromise=this._lastPromise["catch"](function(){return b.value()}),this.then(a)},c.prototype["catch"]=function(a){return this._lastPromise=this._lastPromise["catch"](a)["catch"](e(this)).then(d(this)),this._lastPromise["finally"](f(this._lastPromise)),this},c.prototype.ifnThen=function(a){return this.isPending()?this:this.nthen(a)},c.toLoadables=function(b){return a.map(b,function(a){return new c(a)})},c.resolveLoadables=function(c,d){var e=a.map(c,function(b){return(b.asPromise||a.constant(b)).bind(b)(d)});return b.all(e)};var d=function(a){return function(b){return a.isError(!1),a.value(b)}},e=function(a){return function(c){return a.isError(!0),b.reject(a.error(c))}},f=function(a){return function(){a.done=!0}};return c}]),angular.module("dsTmApp.components").service("Logger",["$log","TmToastT","$translate",function(a,b,c){this.logSuccess=function(a){return function(c){return angular.isObject(a)?b.succ(a.message,a.params):a&&b.succ(a),c}},this.logError=function(d){return function(e){throw angular.isObject(d)?(a.debug(c.instant(d.message,d.params),e),b.err(d.message,d.params)):(a.debug(d,e),b.err(d)),e}},this.log=function(a,b,c){return a.then(this.logSuccess(b))["catch"](this.logError(c))}}]),angular.module("dsTmApp").run(["$templateCache",function(a){a.put("src/layouts/main.layout.html",'<nav class="white" role="navigation"> <div class="nav-wrapper container"> <a id="logo-container" ui-sref="rt.workspace" class="brand-logo">Real Time PoC</a> <ul class="right hide-on-med-and-down"> <li><a ui-sref="rt.queue">Queue</a></li> </ul> <ul id="nav-mobile" class="side-nav"> <li><a ui-sref="rt.queue">Queue</a></li> </ul> <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="mdi-navigation-menu"></i></a> </div> </nav> <div class="container"> <div class="section" ui-view> </div> </div>'),a.put("src/layouts/queue/queue.layout.html",'<div id="queue-layout" class="row"> <div ng-show="isTweetLoading"> Loading queue(s)... </div> <ul class="collection"> <li class="collection-item avatar" ng-repeat="tweet in tweets" ds-tm-tweet model="tweet"> </li> </ul> </div>'),a.put("src/layouts/workspace/workspace.layout.html",'<div class="row"> <h4 class="col s12 header">Workspace</h4> <div class="col s12 input-field"> <input placeholder="Your name" type="text" id="name"> <label for="name"> </label></div> <h4 class="col s12 header">Your current mention</h4> </div>'),a.put("src/shared-directives/tweet/tweet.dea.html",'<img ng-src="{{model.user.profile_image_url_https}}" alt="" class="circle"> <div class="title">{{model.user.screen_name}}</div> <small>{{model.created_at}}</small> <p>{{model.text}}</p> <a href="#!" class="secondary-content" ng-show="model.answered"> <i class="mdi-navigation-check"></i> </a> <a class="waves-effect waves-light btn" ng-click="makeAnswered(model)" ng-show="!model.answered"> Answer </a> <a class="waves-effect waves-light btn" ng-click="makeUnanswered(model)" ng-show="model.answered"> Un-answer </a>')}]);