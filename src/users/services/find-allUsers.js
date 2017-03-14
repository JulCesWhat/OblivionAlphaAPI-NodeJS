'use strict';

const database = require("../../lib/database/NEdatabase");

module.exports = function() {

  return new Promise((resolve, reject) => {
    database.find({}, function(err, users) {
      if(err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
  });
}
