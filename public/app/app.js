var app = angular.module("gwo", ['ngRoute']);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {

    $routeProvider.
        when('/', {
            controller : "home",
            templateUrl : "home.html"
        }).
        when('/contact', {
            controller : "contact",
            templateUrl : "contact.html"
        });

    $locationProvider.html5Mode(true);

}]);