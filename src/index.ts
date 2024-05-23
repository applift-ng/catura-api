/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import Database from './config/database';
import ErrorHandler from './middlewares/error.middleware';
import Logger from './config/logger';
import morgan from 'morgan';
import session from 'express-session';
import * as appServer from 'http';
import { Server } from 'socket.io';
import socketActions from './utils/socket.io';
import {ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData} from '../src/interfaces/socket.interface';
class App {
  public app: Application;
  public host: string | number;
  public port: string | number;
  public api_version: string | number;
  public env: boolean;
  private db = new Database();
  // private passportStrategy = new PassPort();
  private logStream = Logger.logStream;
  private logger = Logger.logger;
  public errorHandler = new ErrorHandler();
  public httpServer: appServer.Server;
  public io;
  // eslint-disable-next-line max-len
  constructor() {
    this.app = express();
    this.host = process.env.APP_HOST;
    this.port = process.env.APP_PORT;
    this.api_version = process.env.API_VERSION;
    this.httpServer = appServer.createServer(this.app);

    this.initializeMiddleWares();
    this.initializeRoutes();
    // this.initializePassport();
    this.initializeDatabase();
    this.initializeErrorHandlers();
    this.initializeSocket();
    this.startApp();
  }

  public initializeMiddleWares(): void {
    this.app.use(
      session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
      })
    );
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(morgan('combined', { stream: this.logStream }));
  }

  public initializeDatabase(): void {
    this.db.initializeDatabase();
  }
  // public initializePassport(): void {
  //   this.passportStrategy.initializePassport();
  // }
  public initializeRoutes(): void {
    this.app.use(`/api/${this.api_version}`, routes());
  }

  public initializeErrorHandlers(): void {
    this.app.use(this.errorHandler.appErrorHandler);
    this.app.use(this.errorHandler.genericErrorHandler);
    this.app.use(this.errorHandler.notFound);
  }
  public initializeSocket(): void {
    this.io = new Server<ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData>(this.httpServer);
    new socketActions(this.io);
  }
  public startApp(): void {
    // this.app.listen(this.port, () => {
    //   this.logger.info(
    //     `Server started at ${this.host}:${this.port}/api/${this.api_version}/`
    //   );
    // });
    this.httpServer.listen(this.port, () => {
      this.logger.info(
        `Server started at ${this.host}:${this.port}/api/${this.api_version}/`
      )
    });
  }

  public getApp(): Application {
    return this.app;
  }
}

const app = new App();

export default app;
