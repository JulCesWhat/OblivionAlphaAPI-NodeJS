
//We might have to restructure this because we are getting the 
var INewsCategory = require('../../lib/models/INewsCategory');

module.exports = (categoryID) =>
  new Promise((resolve, reject) => {

        if (categoryID === 'CategoryTitles') {

          INewsCategory.find({}, (err, NewsCategory) => {
            if (err) {
              reject(err);
            } else {

              //Getting the categories of each major category in the db
              let Categories = [];
              for(let category of NewsCategory){
                let categoryItem = {
                  Name: category.Category,
                  _id: category._id
                }

                Categories.push(categoryItem);
              }

              resolve({
                categoryTitles: Categories
              });
            }
          });
          
        } else if(categoryID === 'PopularData') {

          INewsCategory.findOne({'Category': 'Politics'}, function(err, category) {
            if (err) {
              reject(err);
            } else {
              resolve(category);
            }
          });
          
        } else {

          INewsCategory.findById(categoryID, (err, category) => {
            if (err) {
              reject(err);
            } else {
              resolve(category);
            }
          });

        }
  });
