app.controller('modPost', ["$scope", "$resource", "utils", function($scope, $resource, utils) {

    $scope.removePost = function(index) {
        utils.confirm("Czy na pewno chcesz usunąć wybrany post?", function() {
            console.log($scope.posts[index]);
        });
    };

    $scope.animationPost = [];

    $scope.toggle = function(val, index) {
        if (!$scope[val][index]) {
            $scope[val][index] = true;
        } else {
            $scope[val][index] = !$scope[val][index];
        }
    };

    $scope.select = {};

    /**
     * @description
     * Add category from select element to post category list
     */
    $scope.addCategoryPostMod = function(index) {
        if ($scope.select.categorySelectMod && $scope.posts[index].category.indexOf($scope.select.categorySelectMod) < 0) {
            $scope.posts[index].category.push($scope.select.categorySelectMod);
            $scope.select.categorySelectMod= null;
        }
    };

    /**
     * @description
     * Remove category post
     */
    $scope.removeCategoryPost = function(elem, index) {
        var _index = $scope.posts[index].category.indexOf(elem);
        $scope.posts[index].category.splice(_index, 1);
    };

    $scope.dragAndDrop = {
        background_modPost : {
            effect : false
        }
    };

    $scope.$on('upload_background_modPost', function(ev, files, index) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
        console.log(arguments);
        fileReader.onload = function(e) {
            $scope.posts[index].background = fileReader.result;
            $scope.posts[index].newBackground = files[0];
            $scope.$apply();
        };
    });

}]);