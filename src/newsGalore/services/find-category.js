

var INewsCategory = require('../../lib/database/mongoDB');

module.exports = (categoryID) =>
  new Promise((resolve, reject) => {
    INewsCategory.findById(categoryID, (err, category) => {
      if (err) {
        reject(err);
      } else {
        resolve(category);
      }
    });
  });
