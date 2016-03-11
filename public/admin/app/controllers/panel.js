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
        showbaseHufiec : 'hide'
    };

    /**
     * @description
     * Navigation menu structure (array)
     */
    var Nav = $resource('/index/nav');
    $scope.nav = Nav.query();

    /**
     * @description
     * Contact information object
     */
    var Contact = $resource('/index/contact');
    $scope.contact = Contact.get();

    /**
     * @description
     */
    var Categories = $resource('/blog/tags');
    $scope.categories = Categories.query();

    /**
     * @description
     * New post
     */
    var NewPost = $resource("/blog/post");
    $scope.newPost = new NewPost();
    $scope.newPost.category = [];
    $scope.newPost.site = false;
    $scope.newPost.title = null;
    $scope.newPost.author = null;
    $scope.newPost.content = null;
    $scope.newPost.date = null;
    $scope.newPost.background = null;
    $scope.newPost.gallery = null;

    $scope.blogAddPost = function() {
        $scope.newPost.date = Date.now();
        $scope.newPost.author = location.search.replace("?user=", "");
        console.dir($scope.newPost);
        $scope.newPost.$save(function() {
            // message
            console.dir(arguments);

            $scope.newPost.category = [];
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
        }, function() {
            console.log(arguments);
        });
    };

    // Category models
    $scope._categorySelect = null;
    $scope._newCategory = null;
    /**
     * @description
     * Add category to categories array
     */
    $scope.addCategory = function() {
        if (i) {
            // TODO(jurek) Chcek if writed category doesn't exist
            var Category = $resource('/blog/tags');
            var category = new Category();
            category.newTag = i;
            category.$save(function() {
                $scope.categories.push(i);
            });
        }
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
    }

}]);