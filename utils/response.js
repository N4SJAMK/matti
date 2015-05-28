'use strict';

module.exports = function respond(res, statuscode, message) {
    res.writeHead(statuscode, {'Content-Type': 'text/plain'});
    res.end(message);
}
