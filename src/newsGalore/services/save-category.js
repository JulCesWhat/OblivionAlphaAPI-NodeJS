

var INewsCategory = require('../../lib/database/mongoDB');

module.exports = (iNewsCategory) =>
  new Promise((resolve, reject) => {
    var entry = new INewsCategory({
      Type: iNewsCategory.Type,
      INewsArticles: iNewsCategory.INewsArticles
    });

    entry.save(function (err, product, numAffected) {
      if(err) {
        reject(err);
      } else {
        resolve(product);
      }
    });
  });
