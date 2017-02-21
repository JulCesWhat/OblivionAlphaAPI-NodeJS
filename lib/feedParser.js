//For right now just using a library, I think that the better option will be able to fork the feedparser from github and work on it.

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      INewsCategory = require('../models/INewsCategory'),
      INewsArticle = require('../models/INewsArticle'),
      RSSFeedParser = require('feedparser'),
      request = require('request');

class FeedParser {

  constructor() {
    var firstRRSFeed = request('http://feeds.feedburner.com/breitbart?format=xml');
    var feedParser = RSSFeedParser([]);
    INewsCategory.remove({}, function(){
      console.log("Deleting stuff. :)");
    });


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

    });

    var newsCategories = [
      "Politics", "Economics", "Sports", "War", "Social", "Nothing"
    ]


    var inewsCategory = new INewsCategory();


    parser.on('readable', function () {
      // This is where the action is!
      var stream = this; // `this` is `feedparser`, which is a stream
      var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
      var item;

      while (item = stream.read()) {


        var dataImput = '';
        var summary = (item.summary).toString();
        //console.log('Initial: \n' + summary + '\n');
        var sumContent = summary.split("<br />");
        if(sumContent.length){
          var dataSection = sumContent[1].split('<img');
          dataImput = dataSection[0];
        }


        var newsItems = {
          Category: "Breitbart",
          Title: item.title,
          Img: item.enclosures[0].url,
          Content: dataImput,//item.summary,
          Time: item.date,
          Link: item.link,
          Position: (runningNum1).toString()
        }

      }

    });

  }
}

module.exports = new FeedParser();
