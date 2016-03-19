app.controller("main", ["$scope", '$resource', function($scope, $resource) {

    /**
     * @description
     * Contact information object
     */
    var Contact = $resource('/index/contact');
    $scope.contact = Contact.get();

    // used for animation events in DOM
    $scope.animation = {};

}]);