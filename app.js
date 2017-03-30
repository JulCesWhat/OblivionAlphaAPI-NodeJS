'use-strict';
const express       = require('express'),
      bodyParser    = require('body-parser'),
      cors          = require('cors'),
      glob          = require('glob'),
      morgan        = require('morgan'),
      dataBase      = require('./src/lib/database/mongoDB'),
      app           = express();

const IP = "1.1.1.1";
const PORT = 3000


class Server {

  constructor() {
    this.initExpressMiddleWare();
    this.initCustomMiddleware();
    this.initDataBase();
    this.initRoutes();
    this.start();
  }

  start() {
    app.listen(PORT, (err) => {
      console.log('[%s] Listening on http://localhost:%d', process.env.NODE_ENV, PORT);
    });
  }

  initExpressMiddleWare() {
    app.disable('x-powered-by');
    app.use(cors());
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
  }

  initCustomMiddleware() {
    if (process.platform === "win32") {
      require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
      }).on("SIGINT", () => {
        console.log('SIGINT: Closing MongoDB connection');
        dataBase.close();
      });
    }

    process.on('SIGINT', () => {
      console.log('SIGINT: Closing MongoDB connection');
      dataBase.close();
    });
  }

  initDataBase() {
    if (process.env.NODE_ENV === 'development') {
      dataBase.open((err, sucess) => {
        if (err) {
          process.exit(1);
        }  
      });
    } else {
      //Here we will connect to DinomoDB or S3 from Amazon Web Services
    }
  }

  initRoutes() {
    var resources = glob.sync('./src/*/index.js')
                        .map(ep => require(ep));

    app.use('/api/newsGalore/', resources);

    app.use((req, res, next) => {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    app.use((err, req, res, next) => {
      res.status(err.status || 500);

      res.json({
        dataContent: null,
        errorContent: {
          anyErrors: true,
          errors: [{
            errorMessage: err.message,
            errorStatus: err.status
          }]
        }
      });
    });                    
  }

}

var server = new Server();