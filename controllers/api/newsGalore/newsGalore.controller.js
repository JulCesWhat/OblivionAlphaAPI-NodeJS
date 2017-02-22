const newsGaloreRepo = require('../../../lib/newsGaloreRepository'),
      statesRepo = require('../../../lib/statesRepository'),
      util = require('util');

class NewsGaloreController {

    constructor(router) {
        router.get('/', this.getNewsCategories.bind(this));
        router.get('/:categoryID', this.getNewsCategory.bind(this));
        router.get('/:categoryID/:articleID', this.getNewsArticle.bind(this));
    }

    getNewsCategories(req, res) {
      console.log('*** getNewsCategories');
      newsGaloreRepo.getINewsCategories((err, data) => {
            if (err) {
                console.log('*** getNewsCategories error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getNewsCategories ok');

                res.json({
                  Categories : data.category,
                  CategoryObjects : data.structuredNewsCategory
                });
            }
        });
    }

    getNewsCategory(req, res) {
      console.log('*** getNewsCategory');
        const categoryID = req.params.categoryID;
        console.log('This is the id or better the categoryID => ' + categoryID);

        newsGaloreRepo.getINewsCategory(categoryID, (err, category) => {
            if (err) {
                console.log('*** getNewsCategory error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getNewsCategory ok');
                res.json(category);
            }
        });
    }

    getNewsArticle(req, res) {
      console.log('*** getNewsArticle');
        const categoryID = req.params.categoryID;
        const articleID = req.params.articleID;
        console.log('This is the id or better the categoryID => ' + categoryID);
        console.log('This is the id or better the articleID => ' + articleID);

        newsGaloreRepo.getINewsArticle(categoryID, articleID, (err, article) => {
            if (err) {
                console.log('*** getNewsArticle error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getNewsArticle ok');
                res.json(article);
            }
        });
    }

}

module.exports = NewsGaloreController;
