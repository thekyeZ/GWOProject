app.controller('modPost', ["$scope", "$resource", "utils", function($scope, $resource, utils) {

    /**
     * @description
     * Remove post confirm
     * @param index
     */
    $scope.removePost = function(index) {
        utils.confirm("Czy na pewno chcesz usunąć wybrany post?", function() {
            console.log($scope.posts[index]);
        });
    };

    /**
     * @description
     * Array that storage info about show/hide posts panels
     * @type {Array}
     */
    $scope.animationPost = [];

    /**
     * @description
     * Just toggle boolean value in $scope
     * Make for animationPost Array
     * @param val
     * @param index
     */
    $scope.toggle = function(val, index) {
        if (!$scope[val][index]) {
            $scope[val][index] = true;
        } else {
            $scope[val][index] = !$scope[val][index];
        }
    };

    /**
     * @description
     * Storage selected category in <select> tag
     * @type {{}}
     */
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

    /**
     * @description
     * Prepare image to post model and view
     */
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

    /**
     * @description
     * Update post
     * @param index
     */
    $scope.save_modPost = function(index) {
        if ($scope.posts[index].newBackground) {
            delete $scope.posts[index].background;
        }
        // TODO(jurek) Progress/finish alert
        $scope.posts[index].$save();
    };

    /**
     * @description
     * Restore original image
     * @param index
     */
    $scope.returnDefaultBackground = function(index) {
        $scope.posts[index].background = $scope.posts[index].oldBackground;
        delete $scope.posts[index].oldBackground;
        delete $scope.posts[index].newBackground;
    }

}]);