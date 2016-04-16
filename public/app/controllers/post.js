app.controller('post', ["$scope", "$routeParams", "$resource", "$sce", function($scope, $routeParams, $resource, $sce) {

    var Post = $resource('/blog/post/:id');
    $scope.post = Post.get({ id : $routeParams.post }, function() {
        console.log(arguments);
        $scope.post.content = $sce.trustAsHtml($scope.post.content );
    });

}]);