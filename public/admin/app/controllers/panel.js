app.controller("panel", ["$scope", "$resource", function($scope, $resource) {

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

}]);