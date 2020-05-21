import express from "express";
import path from "path";

export default class Server {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.port = port;

    this.app = express();
  }

  private publicFolder() {
    const publicPath = path.resolve(__dirname, "../public");
    this.app.use(express.static(publicPath));
  }

  static init(port: number) {
    return new Server(port);
  }

  start(callback: (x: any) => void) {
    this.app.listen(this.port, "0.0.0.0", 511, callback);
    this.publicFolder();
  }
}
