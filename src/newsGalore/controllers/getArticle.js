

const findArticle = require('../services/find-article');

module.exports = (req, res, next) => {
  const categoryID = req.params.categoryID;
  const articleID = req.params.articleID;

  return  findArticle(categoryID, articleID)
            .then(users => res.send(users.string))
            .catch(next);
}
