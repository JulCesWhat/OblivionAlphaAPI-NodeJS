

var INewsCategory = require('../../lib/models/INewsCategory');

module.exports = (categoryID, articleID) =>
  new Promise((resolve, reject) => {
    INewsCategory.findById(categoryID, (err, category) => {
      if (err) {
        reject(err);
      } else {
        var article = category.NewsItems.id(articleID);

        if(!article) {
          return reject(new Error('Value could not be found. Most likely the articleID is invalid. :)'));
        }
        
        resolve(article);
      }
    });
  });
