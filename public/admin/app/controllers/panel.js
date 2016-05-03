app.controller("panel", ["$scope", "$resource", "utils", function($scope, $resource, utils) {

    /**
     * Account
     */
    var Account = $resource("/admin/name");
    $scope._admin = Account.get();

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
        showmenu : 'hide',
        showcategories : 'hide'
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
     * Drag and drop zone status (effect)
     */
    $scope.dragAndDrop = {
        background : {
            effect : false,
            file : null
        },
        gallery : {
            effect : false,
            file : []
        },
        background_modPost : {
            effect : false
        },
        background_base : {
            effect : false
        }
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
                    form.append(key, value);
                });
                return form;
            },
            'method' : "POST",
            'headers' : {"Content-Type" : undefined}
        }
    });

    /**
     * @description
     * Sort posts by new
     */
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
        if (!$scope.tag.newCategory) return utils.message("Nie wpisano kategorii!", false);
        utils.message("Czekaj! Trwa dodawanie...", false, "Admin panel");
        if ($scope.categories.indexOf($scope.tag.newCategory) >= 0) return utils.message("Podana kategoria już istnieje!", false);
        var Category = $resource('/blog/tags');
        var category = new Category();
        category.newTag = $scope.tag.newCategory;
        category.$save(function() {
            $scope.categories.push($scope.tag.newCategory);
            $(".modal-body").text("Dodano kategorię: "+$scope.tag.newCategory);
            $scope.tag.newCategory = null;
        });
    };

}]);