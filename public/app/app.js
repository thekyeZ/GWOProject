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
        });

    $locationProvider.html5Mode(true);

}]);