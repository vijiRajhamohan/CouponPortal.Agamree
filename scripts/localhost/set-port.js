"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = require("fs");
var tcp_port_used_1 = tslib_1.__importDefault(require("tcp-port-used"));
var server_port_1 = require("./server-port");
setLocalPort();
function setLocalPort() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var port, data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAvailablePort()];
                case 1:
                    port = _a.sent();
                    data = JSON.stringify({
                        serverPort: port
                    });
                    fs_1.writeFileSync(server_port_1.localPortFile, data);
                    return [2 /*return*/];
            }
        });
    });
}
function getAvailablePort(portNumber) {
    if (portNumber === void 0) { portNumber = 3000; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            // Check to see if portNumber is in use on localhost
            return [2 /*return*/, tcp_port_used_1.default
                    .check(portNumber, '127.0.0.1')
                    // if port is inUse, call getPort again with the next port number
                    // When an open port is found, return that number
                    .then(function (inUse) { return inUse ? getAvailablePort(portNumber + 1) : portNumber; })
                    // If an exception is thrown, return portNumber even if in use and nuxt will default to randomly picked port
                    .catch(function () { return portNumber; })];
        });
    });
}
//# sourceMappingURL=set-port.js.map