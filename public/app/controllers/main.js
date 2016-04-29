app.controller("main", ["$scope", '$resource', function($scope, $resource) {

    /**
     * @description
     * Site information
     */
    var Site = $resource('/site');
    $scope.site = Site.get();

    console.log($scope.site);

}]);
