var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var INewsArticle = new Schema({
    title: String,
    img: String,
    content: String,
    url: String,
    date: { type: Date },
    country: String,
    company: String
});

var INewsCategory = new Schema({
    type: { type: String },
    newsArticles: [ INewsArticle ]
});