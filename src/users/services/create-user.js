'use strict';

const database = require("../../lib/database/NEdatabase");

module.exports = function(user) {
  if(!user) {
    throw new Error("User can't be saved because it is an empty value.");
  }

  return new Promise((resolve, reject) => {
    database.insert(user, function(err, newUser) {
      if(err) {
        reject(err);
      } else {
        resolve(newUser);
      }
    });
  });
}
