//For right now just using a library, I think that the better option will be able to fork the feedparser from github and work on it.

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      RSSFeedParser = require('feedparser'),
      request = require('request'),
      newsGaloreRepo = require('./newsGaloreRepository'),
      INewsCategory = require('../models/INewsCategory'),
      INewsArticle = require('../models/INewsArticle');

class FeedParser {

  init() {
    var firstRRSFeed = request('http://feeds.feedburner.com/breitbart?format=xml');
    var feedParser = new RSSFeedParser([]);
    INewsCategory.remove({}, function(){
      console.log("Deleting stuff. :)");
    });

    this.requestStart(firstRRSFeed, feedParser);
    this.parserStart(feedParser);
  }

  requestStart(req, parser) {

    req.on('error', function (error) {
      // handle any request errors
      console.log('Error: -> ' + error);
    });

    req.on('response', function (res) {
      var stream = this; // `this` is `req`, which is a stream

      if (res.statusCode !== 200) {
        this.emit('error', new Error('Bad status code'));
      }
      else {
        stream.pipe(parser);
      }
    });
  }

  parserStart(parser) {

    parser.on('error', function (error) {
      // always handle errors
      console.log('Error: -> ' + error);
      console.log('Am I here???');

    });

    var newsCategories = [
      "Politics", "Economics", "Sports", "War", "Social", "Capi"
    ]

    for(let i = 0; i < newsCategories.length; i++) {
      var iNewsCategory = new INewsCategory({
        "Category" : newsCategories[i],
        "NewsItems" : [],
        "ArticlesCount" : 0
      });

      newsGaloreRepo.insertINewsCategory(iNewsCategory, (err, category) => {
        if(err) {
          console.log("There was an error adding categories to the database.");
        }
        //console.log("Adding --> " + category.Category);
      });
    }

    var dataBaseData = [];

    newsGaloreRepo.getINewsCategories((err, data) => {
      if(err) {
        console.log("There was an error getting all the categories from the database.");
      }
      dataBaseData = data.newsCategory;
      //console.log('\n' + dataBaseData + "  null?? " + '\n');

    });

    var pos = 0;

    parser.on('readable', function () {
      // This is where the action is!
      var stream = this; // `this` is `feedparser`, which is a stream
      var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
      var item;

      while (item = stream.read()) {

        if(item) {

          //console.log(dataBaseData.categories[i].Category + '   <-- the data from MongoDB');
          var inewscategory = dataBaseData[pos];
          //console.log(inewscategory.Category);

          if(inewscategory) {
            var dataImput = '';
            var summary = (item.summary).toString();
            //console.log('Initial: \n' + summary + '\n');
            var sumContent = summary.split("<br />");
            if(sumContent.length){
              var dataSection = sumContent[1].split('<img');
              dataImput = dataSection[0];
          }
            var iNewsArticle = new INewsArticle();
            iNewsArticle.Category = inewscategory.Category;
            iNewsArticle.Title = item.title;
            iNewsArticle.Image = item.enclosures[0].url;
            iNewsArticle.Content = dataImput;
            iNewsArticle.Time = item.date;
            iNewsArticle.Link = item.link;
            iNewsArticle.Company = "Fill this later. :)";
            iNewsArticle.RelatedArticles = [];

            newsGaloreRepo.insertINewsArticle(inewscategory._id, iNewsArticle, (err, data) => {
              if(err) {
                console.log("Error at adding an article to the category.");
                //console.log(JSON.stringify(iNewsArticle) + '\n')
              } else {
                console.log("Sucess at adding an article to the category.");
              }
            });
          }

          pos = pos + 1

          if (pos === dataBaseData.length) {
            pos = 0;
          }
        }

      }

    });

  }
}

module.exports = new FeedParser();
