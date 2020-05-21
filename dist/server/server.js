"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
    }
    publicFolder() {
        const publicPath = path_1.default.resolve(__dirname, "../public");
        this.app.use(express_1.default.static(publicPath));
    }
    static init(port) {
        return new Server(port);
    }
    start(callback) {
        this.app.listen(this.port, "0.0.0.0", 511, callback);
        this.publicFolder();
    }
}
exports.default = Server;
