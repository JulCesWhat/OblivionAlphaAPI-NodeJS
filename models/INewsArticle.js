const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

const INewsArticleSchema = new Schema({
  id                   : { type : Number, required: true },
  Category             : { type :  String, required: true, trim: true },
  Title                : { type :  String, required: true, trim: true }
  Image                : { type :  String, required: true, trim: true }
  Content              : { type :  String, required: true, trim: true }
  Time                 : { type :  String, required: true, trim: true }
  Link                 : { type :  String, required: true, trim: true }
  Company              : { type :  String, required: true, trim: true }
  RelatedArticles      : [ INewsArticleSchema ]
});

module.exports = mongoose.model('INewsArticle', INewsArticleSchema);
