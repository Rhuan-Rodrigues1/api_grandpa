import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as database from "./database/database";
import { Application } from "express";
import { router } from "./routes";

export class SetupServer {
  private app = express();

  constructor(private port = 3000) {}

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupDatabase();
  }

  private setupExpress(): void {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(
      cors({
        origin: "*",
      })
    );
    this.app.use(router);
  }

  private async setupDatabase(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log("Server running in: http://localhost:3000");
    });
  }

  public getApp(): Application {
    return this.app;
  }
}
