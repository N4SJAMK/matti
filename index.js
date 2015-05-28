var http = require('http');
var exec = require('child_process').exec;

http.createServer(function (req, res) {

    req.setTimeout(10000);
    if(req.method == 'POST') {
        var body = '';

        req.on('data', function (data) {
            body += data
        });

        req.on('end', function() {
            try {
                content = JSON.parse(body);
            } catch(e) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end("Error parsing json from response!");
                return;
            }

            if (content.message) {
                exec('sudo sh /home/cf2015/scp/speech.sh "' + shittyParsing(content.message) + '"', function (error, stdout, stderr) {
                    if (error !== null) {
                        console.log('exec error: ' + error);
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end(error);
                    }
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end("Great job!!!");
                });
            }

            else {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end("message not found u retard");
            }
        });
    }
}).listen(1234, '0.0.0.0');

function shittyParsing(string)
{
    return string.replace(/&/g, "").replace(/|/g, "").replace(/$/g, "").replace(/"/g, "").replace(/'/g, "")
}

console.log('Matti server running!!!');
