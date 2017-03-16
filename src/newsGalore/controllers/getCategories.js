findArticles

const findCategories = require('../services/find-categories');

module.exports = (req, res, next) =>
  findCategories()
    .then(users => res.send(users.string))
    .catch(next);
