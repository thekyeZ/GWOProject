var app = angular.module("adminPanel", ['ngResource']);

// TODO(jurek) CHECK THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.config(function ($httpProvider) {
    //$httpProvider.defaults.transformRequest = function(data) {
    //    if (data === undefined) return data;
    //
    //    var fd = new FormData();
    //    angular.forEach(data, function(value, key) {
    //        if (value instanceof FileList) {
    //            if (value.length == 1) {
    //                fd.append(key, value[0]);
    //            } else {
    //                angular.forEach(value, function(file, index) {
    //                    fd.append(key + '_' + index, file);
    //                });
    //            }
    //        } else {
    //            fd.append(key, value);
    //        }
    //    });
    //
    //    return fd;
    //};
    //
    //$httpProvider.defaults.headers.post['Content-Type'] = undefined;

});