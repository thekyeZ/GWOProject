app.controller("main", ["$scope", function($scope) {

    $scope.nav = [
        {name : 'Dla członków', shortcut: 'dlaczłonków', pos : 0, subMenu : [
            {name : '2', category : "blog", shortcut: '2', pos : 1},
            {name : 'lorem', category : "gallery", shortcut: 'lorem', pos : 0}
        ]},
        {name : 'Dla kadry', shortcut: 'dlakadry', pos : 1, subMenu : [
            {name : 'lorem', category : "page", shortcut: 'lorem', pos : 0}
        ]},
        {name : 'Dla rodziców', shortcut: 'dlarodziców', pos : 2, subMenu : [
            {name : '1', category : "blog", shortcut: '1', pos : 0},
            {name : '2', category : "gallery", shortcut: '2', pos : 1},
            {name : 'lorem', category : "page", shortcut: 'lorem', pos : 2}
        ]},
        {name : 'Bazy', shortcut: 'bazy', pos : 3, subMenu : [
            {name : '1', category : "page", shortcut: '1', pos : 0},
            {name : '2', category : "page", shortcut: '2', pos : 1}
        ]}
    ];

    $scope.footer = {};

    // used for animation events in DOM
    $scope.animation = {};

}]);