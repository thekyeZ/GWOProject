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

    /**
     * @description
     * Modal confirm popup
     */
    var _confirm = function(message, callDelete) {
        $('#modal-body-confirm').text(message);
        $('#modal-confirm').modal('show');
        $('#deleteConfirm').click(function() {
            callDelete();
            $(this).off();
        })
    };

    return {
        message : _message,
        confirm : _confirm
    }

});