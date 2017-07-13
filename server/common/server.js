import express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import cookieParser from 'cookie-parser';
import swaggerify from './swagger';
import l from './logger';
import Database from './lib/database/mongoDB';
import Feedparser from './lib/feedparser/feedParser';
import Promise from 'bluebird';


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
    this.initFeedParser();
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
      if (process.env.NODE_ENV === 'development') {
          let connectionString = "mongodb://localhost/NewsGaloreManager";
          Database.open(connectionString, (err) => {
              if (err) {
                process.exit(1);
              }
          });
      } else {
        //Here we will connect to DinomoDB or S3 from Amazon Web Services
          let connectionString = "mongodb://Cesar:CesarWhatley@cluster0-shard-00-00-mk80y.mongodb.net:27017,cluster0-shard-00-01-mk80y.mongodb.net:27017,cluster0-shard-00-02-mk80y.mongodb.net:27017/NewsGaloreManager?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
          Database.open(connectionString, (err) => {
              if (err) {
                process.exit(1);
              }
          });
      }
  }

  initFeedParser() {
    var capi = [
      "http://feeds.feedburner.com/breitbart",
      "http://feeds.feedburner.com/WiiUDaily",
      "http://feeds.feedburner.com/Co-optimus",
      "http://feeds.feedburner.com/makeuseof",
      "http://feeds.feedblitz.com/Gizmag",
      "http://feeds.feedburner.com/ubergizmo",    //News
      "http://feeds.mashable.com/Mashable",   //News
      "http://feeds.feedburner.com/WallStCheatSheetCore",
      "http://feeds.feedburner.com/coolsmartphone/uJxV",   //Tech
      "http://feeds.feedburner.com/coolsmartphone/uJxV",    //Tech
      "http://feeds.feedburner.com/TheBoyGeniusReport"     //Tech
    ];


    Promise.map(capi, (url) => Feedparser.fetch(url), {concurrency: 10}) // note that concurrency limit
    .then((feeds) => {
        // do something with your feeds...
        Feedparser.RSSLoadDB(feeds);
    });
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