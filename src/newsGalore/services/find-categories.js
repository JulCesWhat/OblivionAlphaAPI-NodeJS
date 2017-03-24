

var INewsCategory = require('../../lib/database/mongoDB');

module.exports = () =>
  new Promise((resolve, reject) => {
    INewsCategory.find((err, categories) => {
      if (err) {
        reject(err);
      } else {
        resolve(categories);
      }
    });
  });
