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

    if (!$scope.dragAndDrop) {
        $scope.dragAndDrop = {
            background_modPost : {
                effect : false
            }
        }
    } else {
        $scope.dragAndDrop.background_modPost = {
            effect : false
        }
    }

    $scope.$on('upload_background_modPost', function(ev, files, index) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = function(e) {
            if (!$scope.posts[index].oldBackground) {
                $scope.posts[index].oldBackground = $scope.posts[index].background;
                $scope.posts[index]._oldBackground = $scope.posts[index].background;
            }
            $scope.posts[index].background = fileReader.result;
            $scope.posts[index].newBackground = files[0];
            $scope.$apply();
        };
    });

    $scope.save_modPost = function(index) {
        // TODO(jurek) Remove 'background' field if newBackground is available
        if ($scope.posts[index].newBackground) {
            delete $scope.posts[index].background;
        }
        $scope.posts[index].$save(function() {
            console.log(arguments);
        });
    };

    $scope.returnDefaultBackground = function(index) {
        $scope.posts[index].background = $scope.posts[index].oldBackground;
        delete $scope.posts[index].oldBackground;
        delete $scope.posts[index].newBackground;
    }

}]);