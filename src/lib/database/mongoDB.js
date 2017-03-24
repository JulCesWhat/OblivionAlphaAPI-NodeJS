var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var INewsArticle = new Schema({
    Title: String,
    Img: String,
    Content: String,
    Url: String,
    Date: { type: Date },
    Country: String,
    Company: String
});

var INewsCategory = new Schema({
    Type: { type: String },
    INewsArticles: [ INewsArticle ]
});

// Export model...
module.exports = mongoose.model('INewsCategory', INewsCategory);