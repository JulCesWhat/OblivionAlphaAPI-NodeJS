// Module dependencies

const mongoose = require('mongoose'),
      connectionString = "mongodb://Cesar:CesarWhatley@cluster0-shard-00-00-mk80y.mongodb.net:27017,cluster0-shard-00-01-mk80y.mongodb.net:27017,cluster0-shard-00-02-mk80y.mongodb.net:27017/NewsGaloreManager?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin" //'mongodb://' + process.env.DBCONFIG_HOST + '/' + process.env.DBCONFIG_DATABASE;
      mongoose.Promise = require('bluebird');

let   connection = null;

export class Database {

    open(callback) {
        mongoose.connect(connectionString);
        connection = mongoose.connection;

        mongoose.connection.on('error', (err) => {
            console.log('Error connecting to MongoDB: ' + err);
            callback(err, false);
        });

        mongoose.connection.once('open', () => {
            console.log('We have connected to mongodb');
            callback(null, true);
        });
    }

    // disconnect from database
    close() {
        connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    }

}

export default new Database();
