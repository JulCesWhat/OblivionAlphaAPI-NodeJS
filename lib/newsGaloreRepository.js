const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      INewsCategory = require('../models/INewsCategory')
      INewsArticle = require('../models/INewsArticle');

class NewsGaloreRepository {

  getINewsCategories(callback) {
    console.log('*** NewsGaloreRepository.getINewsCategories');
    INewsCategory.count((err, categsCount) => {
      var count = categsCount;
      console.log(`INewsCategories count: ${count}`);

      INewsCategory.find({}, (err, categories) => {
        if (err) {
          console.log(`*** NewsGaloreRepository.getINewsCategories error: ${err}`);
          return callback(err);
        };
        callback(null, {
          count: count,
          categories: categories
        });
      });
    });
  }

  getINewsCategory(categoryID, callback) {
    console.log('*** NewsGaloreRepository.getINewsCategory');
    INewsCategory.findById(categoryID, (err, category) => {
      if (err) {
          console.log(`*** NewsGaloreRepository.getINewsCategory error: ${err}`);
          return callback(err);
      }
      callback(null, category);
    });
  }

  getINewsArticle(categoryID, articleID, callback) {
    console.log('*** NewsGaloreRepository.getINewsArticle');
    this.getINewsCategory(categoryID, (err, category) => {
      if (err) {
          console.log('*** NewsGaloreRepository.getINewsArticle error: ' + util.inspect(err));
          return callback(err);
      } else {
        var article = category.Articles.id(articleID);

        if(!article) {
          return callback(new Error("Value could not be found. Most likely the articleID is invalid. :)"));
        }
        callback(null, article);
      }
    });
  }

  insertINewsCategory(newCategoryItem, callback) {
    console.log('*** NewsGaloreRepository.insertINewsCategory');
    var iNewsCategory = new INewsCategory({
      "Category" : newCategoryItem.Category,
      "Articles" : newCategoryItem.Articles,
      "ArticlesCount" : newCategoryItem.ArticlesCount
    });

    iNewsCategory.save((err, iNewsCategory) = > {
      if(err) {
        console.log(`*** NewsGaloreRepository.insertINewsCategory error: ${err}`);
        return callback(err, null);
      }

      callback(null, iNewsCategory);
    });
  }

  insertINewsArticle(newCategoryItemID, newArticleItem, callback) {
    console.log('*** NewsGaloreRepository.insertINewsArticle');


    
  }

}

module.exports = new NewsGaloreRepository();
