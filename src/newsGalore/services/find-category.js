

var INewsCategory = require('../../lib/models/INewsCategory');

module.exports = (categoryID) =>
  new Promise((resolve, reject) => {

        if(categoryID !== "PopularData") {
          INewsCategory.findById(categoryID, (err, category) => {
            if (err) {
              reject(err);
            } else {
              resolve(category);
            }
          });
        } else {
          INewsCategory.findOne({'Category': 'Politics'}, function(err, category) {
            if (err) {
              reject(err);
            } else {
              resolve(category);
            }
          });
        }
  });
