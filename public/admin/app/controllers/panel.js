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

    /**
     * @description
     * TinyMCE configuration
     * @type {{onChange: $scope.tinymceOptions.onChange, inline: boolean, plugins: string, skin: string, theme: string}}
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
    var Posts = $resource('/blog/post');
    $scope.posts = Posts.query(function() {
        // sort by newer
        $scope.posts.sort(function(a, b) {
            return a.date + b.date;
        });
    });


}]);