

var INewsCategory = require('../../lib/models/INewsCategory');

module.exports = (categoryID, articleID) =>
  new Promise((resolve, reject) => {
    INewsCategory.findById(categoryID, (err, category) => {
      if (err) {
        reject(err);
      } else {

        category.findById(articleID, function(err, article) {
          if (err) {
            reject(err);
          } else {
            resolve(article);
          }
        });
      }
    });
  });
