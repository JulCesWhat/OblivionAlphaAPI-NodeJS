

const findCategories = require('./../services/find-categories');

module.exports = (req, res, next) => {

    return findCategories()
            .then(data => 
                res.json({
                    Categories : data.category,
                    CategoryObjects : data.structuredNewsCategory 
                }))
            .catch(next);
};
