'use strict';

var http  = require('http');
var exec  = require('child_process').exec;

var utils = require('./utils');

http.createServer(function (req, res) {
    req.setTimeout(10000);

    if(req.method == 'POST') {
        var body = '';

        req.on('data', function (data) {
            body += data;
            if (body.length > 9001) req.connection.destroy();
        });

        req.on('end', function() {
            try {
                var content = JSON.parse(body);
            } catch(e) {
                utils.response(res, 500, 'Error parsing json from response!');
                return;
            }

            if (content.message) {
                exec('sudo sh ./speech.sh "' + utils.parse(content.message) + '"', function (error, stdout, stderr) {
                    if (error !== null) {
                        console.error('Error executing shell script: ' + error);
                        utils.response(res, 500, error);
                    }
                    utils.response(res, 200, 'Great job!!!')
                });
            }

            else {
                res.writeHead(res, 400, {'Content-Type': 'text/plain'});
                res.end('message not found u retard');
            }
        });
    }
    else {
        utils.response(res, 400, 'Matti only accepts POST method!');
    }
}).listen(1234, '0.0.0.0');
console.log('Matti server running!!!');