const http = require('http');

function sendRequest() {
    http.request({
        //port : 3000,
        //host : "localhost"
        host : "dev.wrzeszczoliwa.pl"
    }, function(response) {
        var serverData = '';
        response.on('data', function(chunk) {
            serverData += chunk;
        });
        response.on('end', function() {
            // console.log(serverData);
        });
    }).end();
}

// for (var i = 0; i < 10; i++) {
//     console.log('Sending...');
//     sendRequest();
// }

var queue = 0,
    errors = [],
    interval = setInterval(function() {
        console.log('Sending... '+queue);
        try {
            sendRequest();
        } catch (e) {
            errors.push(e);
        }
        queue++;
    }, 100);

setTimeout(function() {
    clearInterval(interval);
    queue = 0;
    console.dir(errors);
    errors = [];
}, 60000);