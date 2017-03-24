

var INewsCategory = require('../../lib/models/INewsCategory');

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
