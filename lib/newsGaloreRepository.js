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

      INewsCategory.find({}, (err, NewsCategory) => {
        if (err) {
          console.log(`*** NewsGaloreRepository.getINewsCategories error: ${err}`);
          return callback(err);
        };

        //Getting the categories of each major category in the db
        var Categories = [];
        for(var category of NewsCategory){
          Categories.push(category.Category);
        }

        //I think that we need to create a method that will do this in a
        //randomly fashion so that it can look cool.
        var structuredCategory = [];
        var innerDoublePart = [];
        for(var i = 0; i < NewsCategory.length; i++){
          if(i === 1) {
            innerDoublePart.push(NewsCategory[i]);
          }else if( i === 2) {
            innerDoublePart.push(NewsCategory[i]);
          }else if(i === 3){
            structuredCategory.push(innerDoublePart);
            structuredCategory.push(NewsCategory[i]);
          }else{
            structuredCategory.push(NewsCategory[i]);
          }
        }

        callback(null, {
          count: count,
          newsCategory: NewsCategory,
          structuredNewsCategory: structuredCategory,
          category: Categories
        });
      });
    });
  }

  getINewsCategory(categoryID, callback) {
    console.log('*** NewsGaloreRepository.getINewsCategory');
    //TO-DO: We will have to take this if statement and make an individual table section for
    //       the popular data and will have to have an individual way of inserting data and
    //       pulling data out, but for now it ok. (Alpha version)
    if(categoryID !== "PopularData"){
      INewsCategory.findById(categoryID, (err, category) => {
        if (err) {
            console.log(`*** NewsGaloreRepository.getINewsCategory error: ${err}`);
            return callback(err);
        }
        callback(null, category);
      });
    } else {
      INewsCategory.findOne({'Category': 'Politics'}, function(err, category){
        if(err){
          console.log(`*** NewsGaloreRepository.getINewsCategory error: ${err}`);
          return callback(err);
        }
        callback(null, category);
      });
    }
  }

  getINewsArticle(categoryID, articleID, callback) {
    console.log('*** NewsGaloreRepository.getINewsArticle');
    this.getINewsCategory(categoryID, (err, category) => {
      if (err) {
          console.log(`*** NewsGaloreRepository.getINewsArticle error: ${err}`);
          return callback(err);
      } else {
        var article = category.NewsItems.id(articleID);

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
      "Articles" : newCategoryItem.NewsItems,
      "ArticlesCount" : newCategoryItem.ArticlesCount
    });

    iNewsCategory.save((err, iNewsCategory) => {
      if(err) {
        console.log(`*** NewsGaloreRepository.insertINewsCategory error: ${err}`);
        return callback(err, null);
      }

      callback(null, iNewsCategory);
    });
  }

  insertINewsArticle(newCategoryItemID, newArticleItem, callback) {
    console.log('*** NewsGaloreRepository.insertINewsArticle');
    this.getINewsCategory(newCategoryItemID, (err, category) => {
      if (err) {
        console.log(`*** NewsGaloreRepository.insertINewsArticle while using getINewsCategory error: : ${err}`);
        return callback(err);
      } else {

        var iNewsArticle = new INewsArticle();
        iNewsArticle.Category = category.Category;
        iNewsArticle.Title = newArticleItem.Title;
        iNewsArticle.Image = newArticleItem.Image;
        iNewsArticle.Content = newArticleItem.Content;
        iNewsArticle.Time = newArticleItem.Time;
        iNewsArticle.Link = newArticleItem.Link;
        iNewsArticle.Company = newArticleItem.Company;
        iNewsArticle.RelatedArticles = newArticleItem.RelatedArticles;

        category.NewsItems.push(iNewsArticle);

        category.save((err) => {
          if (err) {
            console.log(`\n*** NewsGaloreRepository.insertINewsArticle second section error: ${err}`);
            return callback(err, null);
          }
        });
        callback(null, iNewsArticle);
      }
    });
  }

}

module.exports = new NewsGaloreRepository();
