app.controller("main", ["$scope", '$resource', function($scope, $resource) {

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

    // used for animation events in DOM
    $scope.animation = {};

}]);