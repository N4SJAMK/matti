'use strict';

var http = require('http');
var exec = require('child_process').exec;

var utils = require('./utils');

var address = process.env.MATTI_ADDR    || '0.0.0.0';
var port    = process.env.MATTI_PORT    || 1234;


http.createServer(function (req, res) {
    if(req.method == 'POST') {
        var body = '';

        req.on('data', function (data) {
            body += data;
            if (body.length > 9001) req.connection.destroy();
        });

        req.on('end', function() {
            console.log(body);
            try {
                var content = JSON.parse(body);
            } catch(e) {
                utils.response(res, 500, 'Error parsing json from response!');
                return;
            }

            if (content.message) {
                var language = 'fi';
                if (content.language) language = utils.parse(content.language);

                exec('sh ./speech.sh "' + utils.parse(content.message) + '" "' + language + '"', function (error, stdout, stderr) {
                    if (error !== null) {
                        console.error('Error executing shell script: ' + error);
                        utils.response(res, 500, error);
                        return;
                    }
                    utils.response(res, 200, 'Great job!!!')
                });
            }

            else {
                res.writeHead(res, 400, {'Content-Type': 'text/plain'});
                res.end('message not found u silly billy');
            }
        });
    }
    else {
        utils.response(res, 400, 'Matti only accepts POST method!');
    }
}).listen(port, address);
console.log('Matti server running at: ' + address + ':' + port);
