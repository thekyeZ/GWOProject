var app = angular.module("gwo", ['ngRoute']);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            controller : "home",
            templateUrl : "home.html"
        });

    $locationProvider.html5Mode(true);

}]);