

const database = require('../../lib/database/NEdatabase');

module.exports = (categoryID, articleID) =>
  new Promise((resolve, reject) => {
    database.findOne({ _id: userID }, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
