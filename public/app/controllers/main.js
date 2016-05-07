app.controller("main", ["$scope", '$resource', function($scope, $resource) {

    /**
     * @description
     * Site information
     */
    var Site = $resource('/site');
    $scope.site = Site.get();
    
    var Contact = $resource('/page/contact');
    $scope.contact = Contact.get();

}]);
