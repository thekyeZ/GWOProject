"use strict";

app.controller('menu', ["$scope", "$resource", "utils", function($scope, $resource, utils) {

    /**
     * @description
     * Get menu structure
     */
    var Nav = $resource('/index/nav');
    $scope.nav = Nav.query(function() {
        console.log($scope.nav);
    });

    /**
     * @description
     * Stores expanded menu (lvl 2 and 3)
     */
    $scope.expanded = {
        lvl_2 : false,
        lvl_3 : false,
        lvl_2_index : null,
        lvl_3_index : null
    };

    /**
     * @description
     * Toggle state of menu (lvl 2 and 3)
     * @param lvl {number}
     * @param index {number}
     */
    $scope.toggleExpand = function(lvl, index) {
        var _lvl = 'lvl_'+lvl+'_index',
            title;
            if (index === $scope.expanded[_lvl]) {
                $scope.expanded[_lvl] = false;
                $scope.expanded["lvl_"+lvl] = false;
                if (lvl === 2) {
                    $scope.expanded['lvl_3_index'] = false;
                    $scope.expanded["lvl_3"] = false;
                }
            } else {
                switch (lvl) {
                    case 2:
                        title = $scope.nav[index].title;
                        break;
                    case 3:
                        title = $scope.nav[$scope.expanded.lvl_2_index].menu[index].title;
                        break;
                }
                $scope.expanded[_lvl] = index;
                $scope.expanded["lvl_"+lvl] = title;
            }
    };

    /**
     * @description
     * Remove position in menu
     */
    $scope.removePosition = function(lvl, index) {
        utils.confirm("Czy na pewno chcesz usunąć wybraną pozycję?", function() {
            switch (lvl) {
                case 1:
                    $scope.nav.splice(index, 1);
                    if ($scope.expanded.lvl_3_index === $scope.expanded.lvl_2_index) $scope.expanded.lvl_3_index = false;
                    if ($scope.expanded.lvl_2_index === index) $scope.expanded.lvl_2_index = false;
                    $scope.$apply();
                    break;
                case 2:
                    $scope.nav[$scope.expanded.lvl_2_index].menu.splice(index, 1);
                    if ($scope.expanded.lvl_3_index === index) $scope.expanded.lvl_3_index = false;
                    $scope.$apply();
                    break;
                case 3:
                    $scope.nav[$scope.expanded.lvl_2_index].menu[$scope.expanded.lvl_3_index].menu.splice(index, 1);
                    $scope.$apply();
                    break;
            }
        });
    };

    /**
     * @description
     * Add position in menu
     */
    $scope.addPosition = function(lvl) {
        switch (lvl) {
            case 1:
                if (!$scope.nav) $scope.nav = [];
                $scope.nav[$scope.nav.length] = {
                    title : null,
                    link : "false"
                };
                break;
            case 2:
                if (!$scope.nav[$scope.expanded.lvl_2_index].menu) $scope.nav[$scope.expanded.lvl_2_index].menu = [];
                $scope.nav[$scope.expanded.lvl_2_index].menu[$scope.nav[$scope.expanded.lvl_2_index].menu.length] = {
                    title : null,
                    link : "false"
                };
                break;
            case 3:
                if (!$scope.nav[$scope.expanded.lvl_2_index].menu[$scope.expanded.lvl_3_index].menu) $scope.nav[$scope.expanded.lvl_2_index].menu[$scope.expanded.lvl_3_index].menu = [];
                $scope.nav[$scope.expanded.lvl_2_index].menu[$scope.expanded.lvl_3_index].menu[$scope.nav[$scope.expanded.lvl_2_index].menu[$scope.expanded.lvl_3_index].menu.length] = {
                    title : null,
                    link : "false"
                };
                break;
        }
    };

    $scope.sendMenu = function() {
        var update = new Nav();
        update.nav = $scope.nav;
        update.$save();
    }

}]);
