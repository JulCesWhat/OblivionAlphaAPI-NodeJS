import express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import cookieParser from 'cookie-parser';
import swaggerify from './swagger';
import l from './logger';
import Database from './lib/database/mongoDB';


const app = new express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    app.disable('x-powered-by');
    app.set('appPath', root + 'client');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));

    this.initCustomMiddleware();
    this.initDataBase();
  }

  initCustomMiddleware() {
    if (process.platform === 'win32') {
      require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      }).on('SIGINT', () => {
        console.log('SIGINT: Closing MongoDB connection');
        Database.close();
      });
    }

    process.on('SIGINT', () => {
      console.log('SIGINT: Closing MongoDB connection');
      Database.close();
    });
  }

  initDataBase() {
    //if (process.env.NODE_ENV === 'development') {
      Database.open((err) => {
        if (err) {
          process.exit(1);
        }
      });
    //} else {
      //Here we will connect to DinomoDB or S3 from Amazon Web Services
    //}
  }

  router(routes) {
    swaggerify(app, routes)
    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = port => () => l.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname() } on port: ${port}}`);
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}