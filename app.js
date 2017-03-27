'use-strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dataBase = require('./src/lib/database/mongoDB');
const cors = require('cors');

const IP = "1.1.1.1";
const PORT = 3000

const glob = require('glob');

app.disable('x-powered-by');
app.use(cors());

dataBase.open((err, sucess) => {
  if(err) {
    process.exit(1);
  } 
});


// This is the corrent way to close a connection from mongoDB
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

var resources = glob.sync('./src/*/index.js')
  .map(ep => require(ep));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
      errors: [
        {
          errorMessage: err.message,
          errorStatus: err.status
        }
      ]
    }
  });
});

app.listen(PORT, (err) => {
  console.log('[%s] Listening on http://localhost:%d', process.env.NODE_ENV, PORT);
});

module.exports = app;
