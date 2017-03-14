'use strict';

const database = require("../../lib/database/NEdatabase");

module.exports = function(userID, newUser) {
  if(!userID || !newUser) {
    throw new Error("User could not be updated becuase the key or newValue are empty values.");
  }

  return new Promise((resolve, reject) => {
    database.update({ _id: userID }, { name: newUser.name, email: newUser.email }, {}, function(err, updatedUser) {
      if(err) {
        reject(err);
      } else {
        if(updatedUser = 1) {
          resolve(newUser);  //    <-----    newUser because that contains the data that is replacing the old data.
        } else {
          throw new Error("Nothing was updated in the database because the key was non-existant.");
        }
      }
    });
  });
}
