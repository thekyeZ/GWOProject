app.controller("home", ["$scope", function($scope) {

    $scope.posts = [
        {
            title : "Random post title 1",
            category : ['rodzice', 'wyjazd'],
            date : 1456354941985,
            author : "admin",
            backgroundImage : "someUrl",
            content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto culpa eius error hic incidunt ipsa ipsam nostrum numquam, officia provident soluta suscipit, tempore! Dolor eveniet magnam nemo ullam voluptate voluptatibus?"
        },
        {
            title : "Random post title 2",
            category : ['baza'],
            date : 1156354149985,
            author : "admin",
            backgroundImage : "someUrl",
            content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto culpa eius error hic incidunt ipsa ipsam nostrum numquam, officia provident soluta suscipit, tempore! Dolor eveniet magnam nemo ullam voluptate voluptatibus?"
        }
    ];

    $scope.events = [
        {title : 'Event 1', desc : "Lorem ipsum", date : 1156354149985, link : "/blog/143"},
        {title : 'Event 2', desc : "Lorem ipsum", date : 1156354139985, link : "/blog/123"}
    ];

    function sortingPosts(array) {
        array.sort(function(a, b) {
            var c = new Date(a.date),
               d = new Date(b.date);
            return c - d;
        });
    }

    $scope.sortByDate = sortingPosts;

}]);
