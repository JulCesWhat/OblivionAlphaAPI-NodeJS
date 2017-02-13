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
  Category: "Breitbart",
  Type: "Breitbart",
  Country: "USA",
  NewsItems: []
}

var newsItemsTry = null;

feedparser1.on('readable', function () {
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

    NewsCategory1.NewsItems.push(newsItems);
    //console.log("Next loop starts here of RSS 1\n\n");
    runningNum1++;
    newsItemsTry = newsItems;
  }

});


var req2 = request('http://www.asiatoday.com/event/rss.xml');
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
  Category: "AsiaToday",
  Type: "Fox News",
  Country: "USA",
  NewsItems: []
}

feedparser2.on('readable', function () {
  // This is where the action is!
  var stream = this; // `this` is `feedparser`, which is a stream
  var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
  var item;

  while (item = stream.read()) {

    //console.log('Parsed: \n' + dataImput + '\n');
    var data = '';
    if(item.enclosures.length){
      //console.log(item.enclosures);
      data = item.enclosures[0].url;
    }

    //console.log(item);

    var newsItems = {
      Category: "AsiaToday",
      Title: item.title,
      Img: data,
      Content: item.description,
      Time: item.date,
      Link: item.link,
      Position: (runningNum2).toString()
    }
    NewsCategory2.NewsItems.push(newsItems);

    //console.log("Next loop starts here of RRS 2\n\n");
    runningNum2++;
  }

});

var dataToPass = {
  Categories: ["Sports", "Fashion", "Business", "Technology", "Games", "Life & Style", "Photography" ],
  CategoryObjects: []
}

app.get('/newsGalore', function(req, res){
  dataToPass.CategoryObjects.push(NewsCategory1);
  dataToPass.CategoryObjects.push(NewsCategory2);

  console.log("\n\nRequesting data...:)\n\n");
  res.json(dataToPass);

});

//'/users/:userId/books/:bookId', function (req, res) {
app.get('/newsGalore/:category', function(req, res){
  console.log("Got the category request");
  console.log(NewsCategory1.Type)
  res.json(NewsCategory1);
});

app.get('/newsGalore/:category/:article', function(req, res){
  console.log("Got the category and article request");
  res.json(newsItemsTry);
});

app.listen(port, function(){
  console.log('Server running on port: ' + port);
});
