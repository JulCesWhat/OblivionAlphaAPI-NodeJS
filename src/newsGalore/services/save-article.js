

var INewsCategory = require('../../lib/models/INewsCategory');
var INewsArticle = require('../../lib/models/INewsArticle');

module.exports = (categoryID, iNewsArticle) =>
  new Promise((resolve, reject) => {
    INewsCategory.findById(categoryID, (err, category) => {
      if (err) {
        reject(err);
      } else {

        console.log(iNewsArticle.category); // Did this so that the error can go away
        var entry = new INewsArticle({

        });

        category.INewsArticles.add(entry);
        
        category.save(function (err, product, article) {
          if (err) {
            reject(err);
          } else {
            resolve(article);
          }
        });
      }
    });
  });
