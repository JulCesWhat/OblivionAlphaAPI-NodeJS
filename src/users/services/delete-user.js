'use strict';

const database = require("../../lib/database/NEdatabase");

module.exports = function(userID) {
  if(!userID) {
    throw new Error("User can't be eliminated because the key is empty.");
  }

  return new Promise((resolve, reject) => {
    database.remove({_id: userID}, {}, function(err, userRemoved) {
      if(err) {
        reject(err);
      } else {
        if(userRemoved == 1){
          resolve(userRemoved);
        } else {
          throw new Error("Nothing was removed in the database because the key was non-existant.");
        }
      }
    });
  });
}
