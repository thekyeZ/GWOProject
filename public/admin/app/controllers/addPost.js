app.controller("addPost", ["$scope", "$resource", "utils", function($scope, $resource, utils) {

    /**
     * @description
     * Gallery on/off style
     */
    $scope._galleryOnOff = false;

    /**
     * @description
     * Navigation menu structure (array)
     */
    var Nav = $resource('/site/nav');
    $scope.nav = Nav.query();
    
    /**
     * @description
     * New post
     */
    var NewPost = $resource("/blog/post", {}, {
        'save' : {
            'transformRequest' : function(data) {
                if (data === undefined) return data;

                var form = new FormData();
                angular.forEach(data, function(value, key) {
                    if (value instanceof FileList) {
                        if (value.length == 1) {
                            form.append(key, value[0]);
                        }
                    } else {
                        form.append(key, value);
                    }
                });
                return form;
            },
            'method' : "POST",
            'headers' : {"Content-Type" : undefined}
        }
    });
    $scope.newPost = new NewPost();
    $scope.newPost.category = [];
    $scope.newPost.site = false;
    $scope.newPost.post = true;
    $scope.newPost.title = null;
    $scope.newPost.author = null;
    $scope.newPost.content = null;
    $scope.newPost.date = null;
    $scope.newPost.background = null;
    $scope.newPost.gallery = null;

    $scope.blogAddPost = function() {
        var errors = "";
        if (!$scope.newPost.title) errors+= "Tytuł jest wymagany!\n";
        if ($scope.newPost.category.length === 0) errors+= "Wymagane jest podanie co najmniej jednej kategorii!\n";
        if (!$scope.newPost.content) errors+= "Treść jest wymagana!\n";
        if (!$scope.newPost.post && !$scope.newPost.site) errors+= "Post musi być przypisany do stron lub listy postów!\n";
        if (errors) {
            return utils.message(errors, function () {
                errors = "";
            });
        }

        $scope.newPost.date = Date.now();
        // TODO(jurek) Rebuild user object
        $scope.newPost.author = location.search.replace("?user=", "");
        delete $scope.newPost.message;
        delete $scope.newPost.id;
        // TODO(jurek) Progress/finish alert
        $scope.newPost.$save(function() {

            $scope.newPost.category = [];
            $scope.newPost.post = true;
            $scope.newPost.site = false;
            $scope.newPost.title = null;
            $scope.newPost.author = null;
            $scope.newPost.content = null;
            $scope.newPost.date = null;
            $scope.newPost.background = null;
            $scope.newPost.gallery = null;
            //// Models reset
            $scope._categorySelect = null;
            $scope._newCategory = null;
            $scope.dragAndDrop = {
                background : {
                    effect : false,
                    file : null
                },
                gallery : {
                    effect : false,
                    file : []
                }
            };
        }, function() {
            console.log(arguments);
        });
    };

    // Category models
    $scope._categorySelect = null;
    $scope._newCategory = null;

    /**
     * @description
     * Add category from select element to new post category list
     */
    $scope.addCategoryPost = function() {
        if ($scope._categorySelect !== "" && $scope.newPost.category.indexOf($scope._categorySelect) < 0) {
            $scope.newPost.category.push($scope._categorySelect);
        }
    };

    /**
     * @description
     * Remove category post
     */
    $scope.removeCategoryPost = function(elem) {
        var index = $scope.newPost.category.indexOf(elem);
        $scope.newPost.category.splice(index, 1);
    };

    /**
     * @description
     * Toggle boolean value in newPost
     */
    $scope.toggle = function(val) {
        if (val.indexOf('.') > 0) {
            var prop = val.split('.');
            $scope[prop[0]][prop[1]] = !$scope[prop[0]][prop[1]];
        } else {
            $scope[val] = !$scope[val];
        }
    };

    /**
     * @description
     * Send background photo
     */
    $scope.$on('upload_background', function(ev, files) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = function(e) {
            $scope.dragAndDrop.background.file = e.currentTarget.result;
            $scope.newPost.background = files[0];
            $scope.$apply();
        };
    });

}]);