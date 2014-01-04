var http = require("http");
var url = require("url");
var querystring = require("querystring");

function route(handle, request, response) {
    var method = request.method.toLowerCase();
    var pathName = url.parse(request.url).pathname;

    var action = handle[pathName][method];
    if (typeof action === 'function') {
        action(request, response);
    } else {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

function start(handle) {
    function onRequest(request, response) {
        request.setEncoding("utf8");
        request.query = querystring.parse(url.parse(request.url).query);
        route(handle, request, response);
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;
