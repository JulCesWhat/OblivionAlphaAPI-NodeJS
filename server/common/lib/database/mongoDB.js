// Module dependencies

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

let   connection = null;

export class Database {

    open(connectionString, callback) {
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
