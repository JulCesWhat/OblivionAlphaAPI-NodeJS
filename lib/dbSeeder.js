// Module dependencies
const   mongoose = require('mongoose'),
        INewsCategory = require('../models/INewsCategory'),
        INewsArticle = require('../models/INewsArticle'),
        dbConfig = require('./configLoader').databaseConfig,
        connectionString = `mongodb://${dbConfig.host}/${dbConfig.database}`,
        connection = null;

class DBSeeder {

    init() {
        mongoose.connection.db.listCollections({name: 'NewsCategories'})
                .next((err, collinfo) => {
                    if (!collinfo) {
                        console.log('Starting dbSeeder...');
                        this.seed();
                    }
                });
    }

    seed() {

      INewsCategory.remove({}, function(){
        console.log("Deleting stuff. :)");
      });

      var newsCategories = [
        "Politics", "Economics", "Sports", "War", "Social", "Nothing"
      ]

      var newsArticles = [
        {
          "Category": "Politics1",
          "Title" : "Shishi is here1",
          "Image" : "capy1.png",
          "Content" : "Capi esta volando en paita.",
          "Time" : "10:00 pm",
          "Link" : "capi.com/shishi",
          "Company" : "CapiTimes",
          "RelatedArticles" : []
        },
        {
          "Category": "Politics2",
          "Title" : "Shishi is here2",
          "Image" : "capy2.png",
          "Content" : "Capi esta volando en paita.",
          "Time" : "10:00 pm",
          "Link" : "capi.com/shishi",
          "Company" : "CapiTimes",
          "RelatedArticles" : []
        },
        {
          "Category": "Politics3",
          "Title" : "Shishi is here3",
          "Image" : "capy3.png",
          "Content" : "Capi esta volando en paita.",
          "Time" : "10:00 pm",
          "Link" : "capi.com/shishi",
          "Company" : "CapiTimes",
          "RelatedArticles" : []
        },
        {
          "Category": "Politics4",
          "Title" : "Shishi is here4",
          "Image" : "capy4.png",
          "Content" : "Capi esta volando en paita.",
          "Time" : "10:00 pm",
          "Link" : "capi.com/shishi",
          "Company" : "CapiTimes",
          "RelatedArticles" : []
        },
        {
          "Category": "Politics5",
          "Title" : "Shishi is here5",
          "Image" : "capy5.png",
          "Content" : "Capi esta volando en paita.",
          "Time" : "10:00 pm",
          "Link" : "capi.com/shishi",
          "Company" : "CapiTimes",
          "RelatedArticles" : []
        },
        {
          "Category": "Politics6",
          "Title" : "Shishi is here6",
          "Image" : "capy6.png",
          "Content" : "Capi esta volando en paita.",
          "Time" : "10:00 pm",
          "Link" : "capi.com/shishi",
          "Company" : "CapiTimes",
          "RelatedArticles" : []
        }
      ];

      var i = 0;
      var j = 0;

      for (i = 0; i < newsCategories.length; i++){
        var NewsCategory = new INewsCategory({
          'Category' : newsCategories[i]
        });
        NewsCategory.Articles = [];

        for(j = 0; j < newsArticles.length; j++){
          var NewsArticle = new INewsArticle({
            "Category" : newsCategories[i],
            "Title" : newsArticles[j].Title,
            "Image" : newsArticles[j].Image,
            "Content" : newsArticles[j].Content,
            "Time" : newsArticles[j].Time,
            "Link" : newsArticles[j].Link,
            "Company" : newsArticles[j].Company,
          });
          NewsArticle.RelatedArticles = [];
          NewsCategory.Articles.push(NewsArticle);
        }
        NewsCategory.ArticlesCount = newsCategories.length;

        NewsCategory.save((err, newCate) => {
          if (err) {
            console.log(err);
          } else {
            console.log('inserted INewsCategory: ' + newCate.Category);
          }
       });
      }


    }
}

module.exports = new DBSeeder();
