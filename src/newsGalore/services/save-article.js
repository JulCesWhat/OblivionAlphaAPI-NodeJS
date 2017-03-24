

var INewsCategory = require('../../lib/database/mongoDB');

module.exports = (categoryID, iNewsArticle) =>
  new Promise((resolve, reject) => {
    INewsCategory.findById(categoryID, (err, category) => {
      if (err) {
        reject(err);
      } else {
        category.INewsArticles.save(function (err, product, article) {
          if (err) {
            reject(err);
          } else {
            resolve(article);
          }
        });
      }
    });
  });
