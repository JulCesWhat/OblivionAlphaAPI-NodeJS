'use-strict';

const express         = require('express'),
      bodyParser      = require('body-parser'),
      cookieParser    = require('cookie-parser'),
      errorhandler    = require('errorhandler'),
      //csrf            = require('csurf'),
      cors            = require('cors'),
      glob            = require('glob'),
      morgan          = require('morgan'),
      envConfig       = require('./src/lib/configLoader').environmentConfig,
      dataBase        = require('./src/lib/database/mongoDB'),
      app             = express();

class Server {
      
  constructor() {
    this.initExpressMiddleWare();
    this.initCustomMiddleware();
    this.initDataBase();
    this.initRoutes();
  }

  start() {
    app.listen(envConfig.PORT, envConfig.HOST, 511, (err) => {
      if (err) {
        console.log('Error: ' + err);
      } else {
        console.log('[%s] Listening on htt://%s:%d', process.env.NODE_ENV, envConfig.HOST, envConfig.PORT);
      }
    });
  }

  initExpressMiddleWare() {
    app.disable('x-powered-by');
    app.use(cors());
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(errorhandler());
    app.use(cookieParser());
    //app.use(csrf({ cookie: true }));

    //I think it has something to do with security. ;) ??
    //app.use((req, res, next) => {
      //var csrfToken = req.csrfToken();
      //res.locals._csrf = csrfToken;
      //res.cookie('XSRF-TOKEN', csrfToken);
      //next();
    //});

    process.on('uncaughtException', (err) => {
      if (err) console.log(err, err.stack);
    });
  }

  initCustomMiddleware() {
    if (process.platform === 'win32') {
      require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      }).on('SIGINT', () => {
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
      dataBase.open((err) => {
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

    app.use('/api/', resources);

    app.use((req, res, next) => {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    app.use((err, req, res) => {
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
server.start();