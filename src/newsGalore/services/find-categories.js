

const INewsCategory = require('../../lib/models/INewsCategory');

module.exports = () =>
  new Promise((resolve, reject) => {
    INewsCategory.find({}, (err, NewsCategory) => {
      if (err) {
        reject(err);
      } else {

                //Getting the categories of each major category in the db
        var Categories = [];
        for(var category of NewsCategory){
          Categories.push(category.Category);
          //console.log(JSON.stringify(category))
        }
        //console.log(JSON.stringify(NewsCategory.length))

        //I think that we need to create a method that will do this in a
        //randomly fashion so that it can look cool.
        var structuredCategory = [];
        var innerDoublePart = [];
        console.log(NewsCategory.length + '  length');
        for(let i = 0; i < NewsCategory.length; i++){
          if(i === 1) {
            innerDoublePart.push(NewsCategory[i]);
          }else if( i === 2) {
            innerDoublePart.push(NewsCategory[i]);
          }else if(i === 3){
            structuredCategory.push(innerDoublePart);
            structuredCategory.push(NewsCategory[i]);
          }else{
            structuredCategory.push(NewsCategory[i]);
          }
        }


        resolve({
          newsCategory: NewsCategory,
          structuredNewsCategory: structuredCategory,
          category: Categories
        });
      }
    });
  });
