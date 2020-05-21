import mysql from "mysql";

export default class MySQL {
  private static _instance: MySQL;

  cnn: mysql.Connection;
  connected: boolean = false;

  constructor() {
    console.log("Clase inicializada");

    this.cnn = mysql.createConnection({
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
  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  static escape(value: any) {
    return this.instance.cnn.escape(value);
  }

  static query(query: string, callback: Function) {
    this.instance.cnn.query(query, (err, results: Object[], fields) => {
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

  private connect() {
    this.cnn.connect((err: mysql.MysqlError) => {
      if (err) {
        console.log(err.message);
        return;
      }

      this.connected = true;
      console.log("Database Up");
    });
  }
}
