const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      INewsArticle = require('./INewsArticle');

const INewsCategorySchema = new Schema({
  Category   : { type : String, required: true, trim: true },
  NewsItems    : [ INewsArticle.schema ],
  ArticlesCount : Number,
});

module.exports = mongoose.model('INewsCategory', INewsCategorySchema, 'INewsCategories');
