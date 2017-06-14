
import NewsGaloreService from './../services/newsGalore.service';

export class Controller {

    findArticle(req, res, next) {
        const categoryID = req.params.categoryID;
        const articleID = req.params.articleID;

        NewsGaloreService.
            findArticle(categoryID, articleID)
                .then(article => res.json(article))
                .catch(next);
    }

    findCategory(req, res, next) {
        const categoryID = req.params.categoryID;

        NewsGaloreService.
            findCategory(categoryID)
                .then(category => res.json(category))
                .catch(next);
    }

    findCategories(req, res, next) {
        NewsGaloreService.
            findCategories()
                .then(data => 
                    res.json({
                        Categories : data.category,
                        CategoryObjects : data.structuredNewsCategory 
                    }))
                .catch(next);
    }

    saveArticle(req, res, next) {
    }

    saveCategory(req, res, next) {
    }

}

export default new Controller();
