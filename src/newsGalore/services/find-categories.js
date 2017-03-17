

const database = require('../../lib/database/NEdatabase');

module.exports = (categoryID) =>
  new Promise((resolve, reject) => {
    database.findOne({ _id: categoryID }, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
