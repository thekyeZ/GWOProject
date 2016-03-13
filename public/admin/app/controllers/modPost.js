app.controller('modPost', ["$scope", "$resource", function($scope, $resource) {

    /**
     * @description
     * List of post
     */
    var Posts = $resource('/blog/post');
    $scope.posts = Posts.query(function() {
        // sort by newer
        $scope.posts.sort(function(a, b) {
            return a.date + b.date;
        });
        //console.dir($scope.posts);
    });

}]);