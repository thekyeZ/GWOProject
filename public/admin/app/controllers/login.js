app.controller('login', ["$scope", "$resource", function($scope, $resource) {

    $scope.user = {
        username : null,
        password : null
    };

    $scope.auth = function() {
        var login = $resource('/admin/login');
        login.save(null, $scope.user);
    };

}]);