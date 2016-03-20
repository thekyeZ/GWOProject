app.controller('post', ["$scope", "$routeParams", "$resource", function($scope, $routeParams, $resource) {

    var Post = $resource('/blog/post/:id');
    $scope.post = Post.get({ id : $routeParams.post }, function() {
        console.log(arguments);
    });

}]);