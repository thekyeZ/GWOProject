app.controller("panel", ["$scope", "$resource", function($scope, $resource) {

    /**
     * @description
     * Animation scope
     */
    $scope.animation = {
        showdashboard : 'show',
        showaddPost : 'hide',
        showmodPost : 'hide',
        showcontactStatic : 'hide',
        showbaseHufiec : 'hide',
        showmenu : 'hide'
    };

    /**
     * @description
     * Content Switcher
     */
    $scope.switchContent = function(elem) {
        for (var i in $scope.animation) {
            if ($scope.animation.hasOwnProperty(i)) {
                if ("show"+elem === i) {
                    $scope.animation[i] = "show";
                } else {
                    $scope.animation[i] = "hide";
                }
            }
        }
    };
    // TODO(jurek) Implement router
    if (location.hash) {
        $scope.switchContent(location.hash.replace("#", ""));
    }

    /**
     * @description
     * TinyMCE configuration
     */
    $scope.tinymceOptions = {
        inline: false,
        menubar: false,
        statusbar: false,
        skin: 'lightgray',
        theme : 'modern'
    };

    /**
     * @description
     * List of post
     */
    var Posts = $resource('/blog/post/:id', {id : '@_id'}, {
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
    $scope.posts = Posts.query(function() {
        // sort by newer
        $scope.posts.sort(function(a, b) {
            return a.date + b.date;
        });
        console.dir($scope.posts);
    });

    /**
     * @description
     * Category list
     */
    var Categories = $resource('/blog/tags');
    $scope.categories = Categories.query();

    /**
     * @description
     * Add category to categories array
     */
    $scope.tag = {};
    $scope.addCategory = function() {
        if ($scope.tag.newCategory) {
            // TODO(jurek) Chcek if writed category doesn't exist
            var Category = $resource('/blog/tags');
            var category = new Category();
            category.newTag = $scope.tag.newCategory;
            category.$save(function() {
                $scope.categories.push($scope.tag.newCategory);
                $scope.tag.newCategory = null;
            });
        }
    };

}]);