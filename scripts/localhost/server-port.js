"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
exports.localPortFile = path_1.resolve(__dirname + "/server-port.json");
function getLocalPort() {
    var json = fs_1.readFileSync(exports.localPortFile, 'utf8');
    var data = JSON.parse(json);
    return data.serverPort;
}
exports.getLocalPort = getLocalPort;
//# sourceMappingURL=server-port.js.map