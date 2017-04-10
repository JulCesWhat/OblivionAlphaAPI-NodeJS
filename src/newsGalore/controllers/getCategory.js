

const findCategory = require('./../services/find-category');

module.exports = (req, res, next) => {
    const categoryID = req.params.categoryID;

    return  findCategory(categoryID)
              .then(category => res.json(category))
              .catch(next);
};
