'use strict';

const database = require("../../lib/database/NEdatabase");

module.exports = function(userID) {
  if(!userID) {
    throw new Error("User could not be found becuase the key is an empty value.");
  }

  return new Promise((resolve, reject) => {
    database.findOne({ _id: userID }, function(err, user) {
      if(err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}
