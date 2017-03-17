

const database = require('../../lib/database/NEdatabase');

module.exports = () =>
  new Promise((resolve, reject) => {
    database.find({ }, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
