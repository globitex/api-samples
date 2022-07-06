var querystring = require('querystring');
var https = require('https');

var allowSelfSignedCerts = true;

exports.get = function(baseUrl, endpoint, port, data, headers){
    var options = {
        host: baseUrl,
        port: port,
        path: endpoint += '?' + querystring.stringify(data),
        method: 'GET',
        headers: headers
    };

    if (allowSelfSignedCerts) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }

    https.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(chunk);
        });
    }).end();
};


exports.post = function(baseUrl, endpoint, port, data, headers){
    if (allowSelfSignedCerts) {
         process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; //for self signed certs ignore
    }
    headers['Content-Type'] = "application/x-www-form-urlencoded";

    var postData = querystring.stringify(data);
    var options = {
        host: baseUrl,
        port: port,
        path: endpoint,
        method: 'POST',
        headers: headers
    };

    var request = https.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(chunk);
        });
    });
    request.write(postData);
    request.end();
};

