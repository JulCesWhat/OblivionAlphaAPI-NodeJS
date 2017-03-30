

module.exports = categoryID =>
  new Promise((resolve, reject) => {
    if (categoryID !== '00001111') {
      reject(new Error('There was an error while retrieving a categoryNews from the dataBase.'));
    } else {
      resolve({ 
          Category: "Economics",
          NewsItems: [],
          ArticlesCount: 0
       });
    }
  });
