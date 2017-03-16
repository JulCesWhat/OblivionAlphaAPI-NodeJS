

const findArticle = require('../services/find-article');

module.exports = (req, res, next) =>
  findArticle()
    .then(users => res.send(users.string))
    .catch(next);
