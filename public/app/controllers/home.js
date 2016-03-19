app.controller("home", ["$scope", "$resource", function($scope, $resource) {

    var Posts = $resource("/blog/post");
    $scope.posts = Posts.query(function() {
        // sort by newer
        $scope.posts.sort(function(a, b) {
            return a.date + b.date;
        });
        console.dir($scope.posts);
    });

    /**
     * @description
     * Navigation menu structure (array)
     */
    var Nav = $resource('/index/nav');
    $scope.nav = Nav.query();

    console.log($scope.nav);

}]);
