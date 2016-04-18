"use strict";

app.controller('menu', ["$scope", "$resource", "utils", function($scope, $resource, utils) {

    /**
     * @description
     * Get menu structure
     */
    var Nav = $resource('/site/nav');
    $scope.nav = Nav.query();

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
            $scope.expanded[_lvl] = null;
            $scope.expanded["lvl_"+lvl] = false;
            if (lvl === 2) {
                $scope.expanded['lvl_3_index'] = null;
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
            if (lvl === 2) {
                $scope.expanded['lvl_3_index'] = null;
                $scope.expanded["lvl_3"] = false;
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
                    if ($scope.expanded.lvl_3_index === $scope.expanded.lvl_2_index) {
                        $scope.expanded.lvl_3_index = null;
                        $scope.expanded.lvl_3 = false;
                    }
                    if ($scope.expanded.lvl_2_index === index) {
                        $scope.expanded.lvl_2_index = null;
                        $scope.expanded.lvl_2 = false;
                    }
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

    /**
     * @description
     * Send update menu
     */
    $scope.sendMenu = function() {
        utils.message("Czekaj! Trwa zapisywanie zmian...", false, "Admin panel");
        var update = new Nav();
        update.nav = $scope.nav;
        update.$save(function(req) {
            $(".modal-body").text(req.message);
        });
    };

    /**
     * @description
     * Watching menus status in all nav object (if it should be empty or not)
     */
    // TODO(jurek) Optimal THIS!!!!!!!!!!!!!!!!!!!
    $scope.$watch('nav', function() {
        for (var i = 0; i <= 3; i+=1) {
            if ($scope.nav[i]) {
                if ($scope.nav[i].link !== "false") {
                    if ($scope.expanded.lvl_2_index === i) {
                        if ($scope.expanded.lvl_3_index === $scope.expanded.lvl_2_index) {
                            $scope.expanded.lvl_3_index = null;
                            $scope.expanded.lvl_3 = false;
                        }
                        $scope.expanded.lvl_2_index = null;
                        $scope.expanded.lvl_2 = false;
                    }
                    delete $scope.nav[i].menu;
                } else {
                    for (var z = 0; z <= 7; z+=1) {
                        if ($scope.nav[i].menu[z]) {
                            if ($scope.nav[i].menu[z].link !== "false") {
                                if ($scope.expanded.lvl_2_index === i && $scope.expanded.lvl_3_index === z) {
                                    $scope.expanded.lvl_3_index = null;
                                    $scope.expanded.lvl_3 = false;
                                }
                                delete $scope.nav[i].menu[z].menu;
                            }
                        }
                    }
                }
            }
        }
    }, true);
}]);