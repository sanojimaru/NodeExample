var server = require("./server");
var requestsController = require("./controllers/requests_controller");

var handle = {
    "/vdr": requestsController.action
}

server.start(handle);
