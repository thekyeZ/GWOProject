app.controller("home", ["$scope", "$resource", "$routeParams", "$sce", function($scope, $resource, $routeParams, $sce) {

    var Posts,
        sortPosts = function() {
            // sort by newer
            $scope.posts.sort(function(a, b) {
                return a.date + b.date;
            });
            console.dir($scope.posts);
        };

    /**
     * Requesting all / category posts
     */
    if ($routeParams.tag) {
        Posts = $resource("/blog/post/category/"+$routeParams.tag);
    } else {
        Posts = $resource("/blog/post");
    }
    $scope.posts = Posts.query(function() {
        sortPosts();
        $scope.posts.forEach(function(elem, index) {
            $scope.posts[index].content = $sce.trustAsHtml($scope.posts[index].content);
        });
    });




}]);

app.filter('ellipsis', function () {
    return function (text, length) {
        if (text.length > length) {
            return text.substr(0, length) + "<a href='#'>...</a>";
        }
        return text;
    }
});