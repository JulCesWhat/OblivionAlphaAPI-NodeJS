

import ParserFeed from 'feedparser';
//import requet from 'request';

var request = require('request');
//var FeedParser = require('feedparser');
//  , FeedParser = require(__dirname+'/..')
//  , Iconv = require('iconv').Iconv
//  , zlib = require('zlib');
import Promise from 'bluebird';
import NewsGaloreService from './../../../api/newsGalore/services/newsGalore.service';

var INewsCategory = require('./../models/INewsCategory');
var INewsArticle = require('./../models/INewsArticle');


export class Feedparser {

    constructor(){}

    fetch(url) {
        return new Promise((resolve, reject) => {
            if (!url) { return reject(new Error(`Bad URL (url: ${url}`)); }

            const
            feedparser = new ParserFeed(),
            items     = [];

            feedparser.on('error', (e) => {
                return reject(e);
            }).on('readable', () => {
                // This is where the action is!
                var item;

                while (item = feedparser.read()) {
                    items.push(item)
                }
            }).on('end', () => {
                resolve({
                    meta: feedparser.meta,
                    records: items,
                    url: url
                });
            });

            request({
                method: 'GET',
                url: url
            }, (e, res, body) => {
                if (e) {
                    return reject(e);
                }

                if (res.statusCode != 200) {
                    return reject(new Error(`Bad status code (status: ${res.statusCode}, url: ${url})`));
                }

                feedparser.end(body);
            });
        });
    };

    RSSLoadDB(feedsData) {
        for (let i = 0; i < feedsData.length; i++) {

            for (let e = 0; e < feedsData[i].records.length; e++) {

                if (feedsData[i].records[e].summary) {
                    console.log(feedsData[i].records[e].categories);
                }
            }
            
        }
    }
}

export default new Feedparser();





// var request = require('request')
//   , FeedParser = require(__dirname+'/..')
//   , Iconv = require('iconv').Iconv
//   , zlib = require('zlib');

// function fetch(feed) {
//   // Define our streams
//   var req = request(feed, {timeout: 10000, pool: false});
//   req.setMaxListeners(50);
//   // Some feeds do not respond without user-agent and accept headers.
//   req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
//   req.setHeader('accept', 'text/html,application/xhtml+xml');

//   var feedparser = new FeedParser();


//   // Define our handlers
//   req.on('error', done);
//   req.on('response', function(res) {
//     if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
//     var encoding = res.headers['content-encoding'] || 'identity'
//       , charset = getParams(res.headers['content-type'] || '').charset;
//     res = maybeDecompress(res, encoding);
//     res = maybeTranslate(res, charset);
//     res.pipe(feedparser);
//   });

//   feedparser.on('error', done);
//   feedparser.on('end', done);
//   feedparser.on('readable', function() {
//     var post;
//     while (post = this.read()) {
//       console.log(post);
//     }
//   });
// }

// function maybeDecompress (res, encoding) {
//   var decompress;
//   if (encoding.match(/\bdeflate\b/)) {
//     decompress = zlib.createInflate();
//   } else if (encoding.match(/\bgzip\b/)) {
//     decompress = zlib.createGunzip();
//   }
//   return decompress ? res.pipe(decompress) : res;
// }

// function maybeTranslate (res, charset) {
//   var iconv;
//   // Use iconv if its not utf8 already.
//   if (!iconv && charset && !/utf-*8/i.test(charset)) {
//     try {
//       iconv = new Iconv(charset, 'utf-8');
//       console.log('Converting from charset %s to utf-8', charset);
//       iconv.on('error', done);
//       // If we're using iconv, stream will be the output of iconv
//       // otherwise it will remain the output of request
//       res = res.pipe(iconv);
//     } catch(err) {
//       res.emit('error', err);
//     }
//   }
//   return res;
// }

// function getParams(str) {
//   var params = str.split(';').reduce(function (params, param) {
//     var parts = param.split('=').map(function (part) { return part.trim(); });
//     if (parts.length === 2) {
//       params[parts[0]] = parts[1];
//     }
//     return params;
//   }, {});
//   return params;
// }

// function done(err) {
//   if (err) {
//     console.log(err, err.stack);
//     return process.exit(1);
//   }
//   server.close();
//   process.exit();
// }

// // Don't worry about this. It's just a localhost file server so you can be
// // certain the "remote" feed is available when you run this example.
// var server = require('http').createServer(function (req, res) {
//   var stream = require('fs').createReadStream(require('path').resolve(__dirname, '../test/feeds' + req.url));
//   res.setHeader('Content-Type', 'text/xml; charset=Windows-1251');
//   res.setHeader('Content-Encoding', 'gzip');
//   stream.pipe(res);
// });
// server.listen(0, function () {
//   fetch('http://localhost:' + this.address().port + '/compressed.xml');
// });