"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class MySQL {
    constructor() {
        this.connected = false;
        console.log("Clase inicializada");
        this.cnn = mysql_1.default.createConnection({
            host: "mysql-app",
            user: "node_user",
            password: "hola123",
            database: "node_db",
        });
        this.connect();
    }
    /**
     *
     */
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static escape(value) {
        return this.instance.cnn.escape(value);
    }
    static query(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log("Query error");
                console.log(err);
                return callback(err);
            }
            if (!(Array.isArray(results) && results.length)) {
                return callback(null, null);
            }
            callback(null, results);
        });
    }
    connect() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.connected = true;
            console.log("Database Up");
        });
    }
}
exports.default = MySQL;
