app.controller("main", ["$scope", '$resource', function($scope, $resource) {

    /**
     * @description
     * Site information
     */
    var Site = $resource('/site');
    $scope.site = Site.get();

    console.log($scope.site);

}]);

app.filter('ellipsis', function () {
    return function (text, length) {
        if (text.length > length) {
            return text.substr(0, length) + "<a href='#'>...</a>";
        }
        return text;
    }
});