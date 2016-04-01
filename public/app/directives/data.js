function ConvertToDateObject(num) {
    return new Date(num);
}

function zeroFormat(date) {
    if (date <= 9) {
        return '0'+date;
    } else {
        return date+"";
    }
}

app.directive('numberFormat', function() {

    function _link(scope, elem, attr) {
        var numberFormat = parseInt(attr.numberFormat);
        scope.time = zeroFormat(ConvertToDateObject(numberFormat).getDate())+
            "."+zeroFormat(ConvertToDateObject(numberFormat).getMonth())+
            "."+zeroFormat(ConvertToDateObject(numberFormat).getUTCFullYear());
    }

    return {
        scope : {},
        link : _link,
        template : "<div>{{time}}</div>"
    }

});