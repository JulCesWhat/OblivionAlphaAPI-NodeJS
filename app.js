var express = require('express');
var cors = require('cors');
var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed

var app = express();

var port = process.env.PORT || 3000;




app.use(cors());

var req1 = request('http://feeds.feedburner.com/breitbart?format=xml');
var feedparser1 = new FeedParser([]);

req1.on('error', function (error) {
  // handle any request errors
  console.log('Error: -> ' + error);
});

req1.on('response', function (res) {
  var stream = this; // `this` is `req`, which is a stream

  if (res.statusCode !== 200) {
    this.emit('error', new Error('Bad status code'));
  }
  else {
    stream.pipe(feedparser1);
    console.log('***********THE RESPONSE HANDLER!!!***********');
  }
});

feedparser1.on('error', function (error) {
  // always handle errors
  console.log('Error: -> ' + error);

});

var runningNum1 = 0;

var NewsCategory1 = {
  Position: 1,
  Type: "InforWars",
  Country: "USA",
  NewsItems: []
}


feedparser1.on('readable', function () {
  // This is where the action is!
  var stream = this; // `this` is `feedparser`, which is a stream
  var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
  var item;

  while (item = stream.read()) {

    var newsItems = {
      Title: item.title,
      Img: item.image,
      Content: item.summary,
      Time: item.date,
      Link: item.link,
      Position: (runningNum1 + 1).toString()
    }

    NewsCategory1.NewsItems.push(newsItems);
    //console.log("Next loop starts here of RSS 1\n\n");
    runningNum1++;
  }

});


var req2 = request('http://feeds.feedburner.com/breitbart?format=xml');
var feedparser2 = new FeedParser([]);

req2.on('error', function (error) {
  // handle any request errors
  console.log('Error: -> ' + error);
});

req2.on('response', function (res) {
  var stream = this; // `this` is `req`, which is a stream

  if (res.statusCode !== 200) {
    this.emit('error', new Error('Bad status code'));
  }
  else {
    stream.pipe(feedparser2);
    console.log('***********THE RESPONSE HANDLER!!!***********');
  }
});

feedparser2.on('error', function (error) {
  // always handle errors
  console.log('Error: -> ' + error);

});

var runningNum2 = 0;

var NewsCategory2 = {
  Position: 2,
  Type: "InforWars",
  Country: "USA",
  NewsItems: []
}

feedparser2.on('readable', function () {
  // This is where the action is!
  var stream = this; // `this` is `feedparser`, which is a stream
  var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
  var item;

  while (item = stream.read()) {

    var newsItems = {
      Title: item.title,
      Img: item.image,
      Content: item.summary,
      Time: item.date,
      link: item.link,
      Position: (runningNum2 + 1).toString()
    }
    NewsCategory2.NewsItems.push(newsItems);

    //console.log("Next loop starts here of RRS 2\n\n");
    runningNum2++;
  }

});



app.get('/newsGalore', function(req, res){
  var data1 = [];
  data1.push(NewsCategory1);
  data1.push(NewsCategory2);

  console.log("\n\nRequesting data...:)\n\n");
  res.json(data1);

});

app.listen(port, function(){
  console.log('Server running on port: ' + port);
});
