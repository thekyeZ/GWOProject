app.controller("home", ["$scope", "$resource", "$routeParams", "$sce", function($scope, $resource, $routeParams, $sce) {

    var Posts,
        posts = [],
        skip = 0,
        sortPosts = function() {
            // sort by newer
            posts.sort(function(a, b) {
                return a.date + b.date;
            });
            console.dir(posts);
        },
        load = function() {
        // sortPosts();
            posts.forEach(function(elem, index) {
                console.log(elem);
                posts[index].content = $sce.trustAsHtml(posts[index].content);
                $scope.posts.push(posts[index]);
            });
            skip += 12;
        };

    $scope.posts = [];
    /**
     * Requesting all / category posts
     */
    if ($routeParams.tag) {
        Posts = $resource("/blog/post/category/"+$routeParams.tag+"/:skip", { skip : skip});
    } else {
        Posts = $resource("/blog/posts/:skip", {"skip" : skip});
    }
    posts = Posts.query(load);

    $scope.more = function() {
        if ($routeParams.tag) {
            Posts = $resource("/blog/post/category/"+$routeParams.tag+"/:skip", { skip : skip});
        } else {
            Posts = $resource("/blog/posts/:skip", {"skip" : skip});
        }
        posts = Posts.query(load);
    };
}]);