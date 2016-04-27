app.controller("staticPages", ["$scope", "$resource", "utils", function($scope, $resource, utils) {
    
    var Contact = $resource('/page/contact');
    $scope.contact = Contact.get();

    $scope.sendContact = function() {
        utils.message("Czekaj! Trwa zapisywanie zmian...", false, "Admin panel");
        var cacheContact = new Contact;
        angular.copy($scope.contact, cacheContact);
        cacheContact.$save(function(req) {
            $(".modal-body").text(req.message);
        });
    };

    $scope.addContact = function() {
        $scope.contact.contact.push({
            name : null,
            value : null,
            header : false,
            footer : false
        });
    };

    $scope.deleteContact = function(index) {
        utils.confirm("Czy na pewno chcesz usunąć wybraną pozycję?", function() {
            console.log($scope.contact.contact[index]);
            $scope.contact.contact.splice(index, 1);
            $scope.$apply();
        });
    };

    var Bases = $resource('/page/bazy/:index', { "index" : "@_index"}, {
        'save' : {
            'transformRequest' : function(data) {
                if (data === undefined) return data;

                var form = new FormData();
                angular.forEach(data, function(value, key) {
                    form.append(key, value);
                });
                return form;
            },
            'method' : "POST",
            'headers' : {"Content-Type" : undefined}
        }
    });
    $scope.bases = Bases.query(function() {
        console.log($scope.bases);
    });

    $scope.sendBase = function(index) {
        utils.message("Czekaj! Trwa zapisywanie zmian...", false, "Admin panel");
        $scope.bases[index]._index = index;
        $scope.bases[index].$save(function(req) {
            $(".modal-body").text(req.message);
        });
    };

    $scope.addBase = function() {
        var _new = new Bases;
        _new._index = $scope.bases.length;
        _new.title = "";
        _new.description = "";
        _new.background = "";
        $scope.bases.push(_new);
    };

    $scope.deleteBase = function(index) {
        utils.confirm("Czy na pewno chcesz usunąć wybraną pozycję?", function() {
            $scope.bases.splice(index, 1);
            $scope.$apply();
        });
    };

    $scope.$on('upload_background_base', function(ev, files, index) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = function(e) {
            if (!$scope.bases[index].oldBackground) {
                $scope.bases[index].oldBackground = $scope.bases[index].background;
                $scope.bases[index]._oldBackground = $scope.bases[index].background;
            }
            $scope.bases[index].background = fileReader.result;
            $scope.bases[index].newBackground = files[0];
            $scope.$apply();
        };
    });

    $scope.returnDefaultBackground = function(index) {
        $scope.bases[index].background = $scope.bases[index].oldBackground;
        delete $scope.bases[index].oldBackground;
        delete $scope.bases[index].newBackground;
    }

}]);