var express = require('express');
var cors = require('cors');
var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed

var app = express();

var port = process.env.PORT || 3000;


const data = [
    {
      Position: 0,
      Type: 'Business',
      Country: 'United States of America',
      NewsItems: [
        {
          Title: 'Proin rhoncus consequat nisl eu ornare mauris',
          Img: 'featured_img1.jpg',
          Content: 'Nunc tincidunt, elit non cursus euismod, lacus augue ornare metus, egestas imperdiet nulla nisl quis mauris. Suspendisse a phare...',
          Time: '10:00 am',
          Link: 'single_page.html',
          Position: 1
        },
        {
          Title: 'Aliquam malesuada diam eget turpis varius 1',
          Img: 'post_img1.jpg',
          Content: 'Capivara estuvo aqui. :)',
          Time: '7:00 am',
          Link: 'single_page.html',
          Position: 2
        },
        {
          Title: 'Proin rhoncus consequat nisl eu ornare mauris',
          Img: 'featured_img1.jpg',
          Content: 'Nunc tincidunt, elit non cursus euismod, lacus augue ornare metus, egestas imperdiet nulla nisl quis mauris. Suspendisse a phare...',
          Time: '10:00 am',
          Link: 'single_page.html',
          Position: 3
        },
        {
          Title: 'Aliquam malesuada diam eget turpis varius 1',
          Img: 'post_img1.jpg',
          Content: 'Capivara estuvo aqui. :)',
          Time: '7:00 am',
          Link: 'single_page.html',
          Position: 4
        }
      ]
    },
    {
      Position: 1,
      Type: 'Fashion',
      Country: 'United States of America',
      NewsItems: [
        {
          Title: 'Proin rhoncus consequat nisl eu ornare mauris',
          Img: 'featured_img1.jpg',
          Content: 'Nunc tincidunt, elit non cursus euismod, lacus augue ornare metus, egestas imperdiet nulla nisl quis mauris. Suspendisse a phare...',
          Time: '10:00 am',
          Link: 'single_page.html',
          Position: 1
        },
        {
          Title: 'Aliquam malesuada diam eget turpis varius 1',
          Img: 'post_img1.jpg',
          Content: 'Capivara estuvo aqui. :)',
          Time: '7:00 am',
          Link: 'single_page.html',
          Position: 2
        },
        {
          Title: 'Proin rhoncus consequat nisl eu ornare mauris',
          Img: 'featured_img1.jpg',
          Content: 'Nunc tincidunt, elit non cursus euismod, lacus augue ornare metus, egestas imperdiet nulla nisl quis mauris. Suspendisse a phare...',
          Time: '10:00 am',
          Link: 'single_page.html',
          Position: 3
        },
        {
          Title: 'Aliquam malesuada diam eget turpis varius 1',
          Img: 'post_img1.jpg',
          Content: 'Capivara estuvo aqui. :)',
          Time: '7:00 am',
          Link: 'single_page.html',
          Position: 4
        }
      ]
    },
    {
      Position: 2,
      Type: 'Technology',
      Country: 'United States of America',
      NewsItems: [
        {
          Title: 'Proin rhoncus consequat nisl eu ornare mauris',
          Img: 'featured_img1.jpg',
          Content: 'Nunc tincidunt, elit non cursus euismod, lacus augue ornare metus, egestas imperdiet nulla nisl quis mauris. Suspendisse a phare...',
          Time: '10:00 am',
          Link: 'single_page.html',
          Position: 1,
        },
        {
          Title: 'Aliquam malesuada diam eget turpis varius 1',
          Img: 'post_img1.jpg',
          Content: 'Capivara estuvo aqui. :)',
          Time: '7:00 am',
          Link: 'single_page.html',
          Position: 2,
        },
        {
          Title: 'Proin rhoncus consequat nisl eu ornare mauris',
          Img: 'featured_img1.jpg',
          Content: 'Nunc tincidunt, elit non cursus euismod, lacus augue ornare metus, egestas imperdiet nulla nisl quis mauris. Suspendisse a phare...',
          Time: '10:00 am',
          Link: 'single_page.html',
          Position: 3,
        },
        {
          Title: 'Aliquam malesuada diam eget turpis varius 1',
          Img: 'post_img1.jpg',
          Content: 'Capivara estuvo aqui. :)',
          Time: '7:00 am',
          Link: 'single_page.html',
          Position: 4,
        }
      ]
    },
    {
      Position: 3,
      Type: 'Photography',
      Country: 'United States of America',
      NewsItems: [
        {
          Title: 'Proin rhoncus consequat nisl eu ornare mauris',
          Img: 'featured_img1.jpg',
          Content: 'Nunc tincidunt, elit non cursus euismod, lacus augue ornare metus, egestas imperdiet nulla nisl quis mauris. Suspendisse a phare...',
          Time: '10:00 am',
          Link: 'single_page.html',
          Position: 1,
        },
        {
          Title: 'Aliquam malesuada diam eget turpis varius 1',
          Img: 'post_img1.jpg',
          Content: 'Capivara estuvo aqui. :)',
          Time: '7:00 am',
          Link: 'single_page.html',
          Position: 2,
        },
        {
          Title: 'Proin rhoncus consequat nisl eu ornare mauris',
          Img: 'featured_img1.jpg',
          Content: 'Nunc tincidunt, elit non cursus euismod, lacus augue ornare metus, egestas imperdiet nulla nisl quis mauris. Suspendisse a phare...',
          Time: '10:00 am',
          Link: 'single_page.html',
          Position: 3,
        },
        {
          Title: 'Aliquam malesuada diam eget turpis varius 1',
          Img: 'post_img1.jpg',
          Content: 'Capivara estuvo aqui. :)',
          Time: '7:00 am',
          Link: 'single_page.html',
          Position: 4,
        }
      ]
    },
    {
      Position: 4,
      Type: 'Games',
      Country: 'United States of America',
      NewsItems: [
        {
          Title: 'Proin rhoncus consequat nisl eu ornare mauris',
          Img: 'featured_img1.jpg',
          Content: 'Nunc tincidunt, elit non cursus euismod, lacus augue ornare metus, egestas imperdiet nulla nisl quis mauris. Suspendisse a phare...',
          Time: '10:00 am',
          Link: 'single_page.html',
          Position: 1,
        },
        {
          Title: 'Aliquam malesuada diam eget turpis varius 1',
          Img: 'post_img1.jpg',
          Content: 'Capivara estuvo aqui. :)',
          Time: '7:00 am',
          Link: 'single_page.html',
          Position: 2,
        },
        {
          Title: 'Proin rhoncus consequat nisl eu ornare mauris',
          Img: 'featured_img1.jpg',
          Content: 'Nunc tincidunt, elit non cursus euismod, lacus augue ornare metus, egestas imperdiet nulla nisl quis mauris. Suspendisse a phare...',
          Time: '10:00 am',
          Link: 'single_page.html',
          Position: 3,
        },
        {
          Title: 'Aliquam malesuada diam eget turpis varius 1',
          Img: 'post_img1.jpg',
          Content: 'Capivara estuvo aqui. :)',
          Time: '7:00 am',
          Link: 'single_page.html',
          Position: 4,
        }
      ]
    }
  ]

app.use(cors());

var req = request('http://feeds.feedburner.com/breitbart?format=xml')
var feedparser = new FeedParser([]);
var feedItems = 0;

req.on('error', function (error) {
  // handle any request errors
  console.log("Error on the request!!!!");
  console.log("Error on the request!!!!");
  console.log("Error on the request!!!!");
  console.log(feedItems)
  console.log("Error on the request!!!!");
  console.log("Error on the request!!!!");
});

req.on('response', function (res) {
  var stream = this; // `this` is `req`, which is a stream

  if (res.statusCode !== 200) {
    this.emit('error', new Error('Bad status code'));
  }
  else {
    stream.pipe(feedparser);
    console.log('This is running???');
  }
});

feedparser.on('error', function (error) {
  // always handle errors
  console.log('Error on the on section for reading !!!!');
    console.log('Error on the on section for reading !!!!');
      console.log(feedItems)
      console.log('Error on the on section for reading !!!!');
        console.log('Error on the on section for reading !!!!');

});

feedparser.on('readable', function () {
  // This is where the action is!
  var stream = this; // `this` is `feedparser`, which is a stream
  var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
  var item;
  console.log("************ " + feedItems + "   " + feedItems + " ************");
  while (item = stream.read()) {
    console.log(item);
  }
  console.log("************ " + feedItems + "   " + feedItems + " ************");
  feedItems++;
});




app.get('/newsGalore', function(req, res){
  console.log(req);
  res.json(data);

});

app.listen(port, function(){
  console.log('Server running on port: ' + port);
});
