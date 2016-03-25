"use strict";
app.directive('dragAndDrop', ["utils", function(utils) {

    function link(scope, elements, attributes) {
        var elem = elements[0];
        elem.addEventListener('dragover', function(e) {
            e.stopPropagation();
            e.preventDefault();

            scope.dragAndDrop[elem.id].effect = true;
            scope.$apply();
        }, false);

        elem.addEventListener('dragleave', function(e) {
            e.stopPropagation();
            e.preventDefault();

            scope.dragAndDrop[elem.id].effect = false;
            scope.$apply();
        }, false);

        elem.addEventListener('drop', function(e) {
            e.stopPropagation();
            e.preventDefault();

            scope.dragAndDrop[elem.id].effect = false;
            scope.$apply();

            var files = e.dataTransfer.files,
                filesLength = files.length,
                filesMax = attributes.dragAndDrop;

            if (filesLength > filesMax) return utils.message("Możesz przesłać tylko "+filesMax+" zdjęcie/a");

            Array.prototype.forEach.call(files, function(file) {
                // Check type of file
                if (file.type.search(/image\/[jpegn]{3,4}$/) !== 0) {
                    return utils.message("Wykryto niepoprawny format zdjęcia/zdjęć (zdjęcie musi posiadać format PNG lub JPEG)")
                }
                // Check size of file
                if (file.size > 2000000) {
                    return utils.message("Wykryto zbyt duże zdjęcie (zdjęcie nie może być cięższe niż 2 MB)")
                }
                var options = attributes.dragOptions || null;
                console.log(options);
                scope.$emit('upload_'+elem.id, files, options);
            });
        });
    }

    return {
        link : link
    }

}]);