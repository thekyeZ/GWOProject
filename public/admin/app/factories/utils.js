app.factory('utils', function() {

    /**
     * @description
     * Modal popup
     */
    var _message = function(message, call) {
        $('.modal-body').text(message);
        $('.bs-example-modal-sm').modal('show');
        if (call) call();
    };

    return {
        message : _message
    }

});