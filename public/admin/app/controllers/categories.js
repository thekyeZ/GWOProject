app.controller("categories", ["$scope", "$resource", "utils", function($scope, $resource, utils) {

    var Category = $resource('/blog/tags/:name', { "name" : "@value"});
    var category = new Category();

    $scope.deleteTags = function(value) {
        utils.confirm("Czy na pewno chcesz usunąć kategorię '"+value+"' ?", function() {
            category.value = value;
            category.$delete(function() {
                var index = $scope.categories.indexOf(value);
                $scope.categories.splice(index, 1);
                console.log(category);
            });
        });
    };

}]);