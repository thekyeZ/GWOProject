app.directive('scrollFixed', function() {

    function link(scope, elements, attributes) {
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            if (scroll > attributes.scrollFixed) {
                $(elements[0]).css({'marginTop' : (scroll-attributes.scrollFixed)+"px"});
            } else {
                $(elements[0]).css({'marginTop' : 0});
            }
        });
    }

    return {
        link : link
    }
});