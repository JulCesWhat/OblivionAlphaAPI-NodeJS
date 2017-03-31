

module.exports = (categoryID, articleID) =>
  new Promise((resolve, reject) => {
    if (categoryID !== '11110000') {
      reject(new Error('There was an error while retrieving the categoryNews from the dataBase.'));
    } else {
        if (articleID === '00001111') {
            resolve({ 
                Category: 'Economics',
                Title: 'Shishi was here',
                Image: 'capi.png',
                Content: 'The biggest cat of them all. I :)',
                Time: '10:00 pm',
                Link: 'https://catgalore.com',
                Company: 'Shishi Inc',
                RelatedArticles: []
             });
        } else {
            reject(new Error('There was an error while retrieving the articleNews from the dataBase.'));
        }
    }
  });