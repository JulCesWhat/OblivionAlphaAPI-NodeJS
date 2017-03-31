

var INewsCategory = require('../../lib/models/INewsCategory');

module.exports = (iNewsCategory) =>
  new Promise((resolve, reject) => {
    var entry = new INewsCategory({
      Type: iNewsCategory.Type,
      INewsArticles: iNewsCategory.INewsArticles
    });

    entry.save(function (err, product) {
      if(err) {
        reject(err);
      } else {
        resolve(product);
      }
    });
  });