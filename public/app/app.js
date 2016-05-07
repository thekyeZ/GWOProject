var app = angular.module("gwo", ['ngRoute', 'ngResource']);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {

    $routeProvider.
        when('/', {
            controller : "home",
            templateUrl : "home.html"
        }).
        when('/post/:post', {
            controller : "post",
            templateUrl : "post.html"
        }).
        when('/category/:tag', {
            controller : "home",
            templateUrl : "home.html"
        }).
        when('/kontakt', {
            controller : "home",
            templateUrl : "contact.html"
        }).
        when('/bazy', {
            // controller : "bazy",
            templateUrl : "bazy.html"
        });

    $locationProvider.html5Mode(true);

}]);