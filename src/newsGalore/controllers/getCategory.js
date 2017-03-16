findArticles

const findCategory = require('../services/find-category');

module.exports = (req, res, next) =>
  findCategory()
    .then(users => res.send(users.string))
    .catch(next);
