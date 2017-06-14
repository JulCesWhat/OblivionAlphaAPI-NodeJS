
import l from './../../../common/logger';
import INewsCategory from './../../../common/lib/models/INewsCategory';

export class NewsGaloreService {

    findArticle(categoryID, articleID) {
        l.info(`${this.constructor.name}.findArticle(${categoryID}, ${articleID})`);
        return new Promise((resolve, reject) => {
            INewsCategory.findById(categoryID, (err, category) => {
                if (err) {
                    reject(err);
                } else {
                    var article = category.NewsItems.id(articleID);

                    if(!article) {
                        return reject(new Error('Value could not be found. Most likely the articleID is invalid. :)'));
                    }
                    
                    resolve(article);
                }
            });
        });
    }

    findCategory(categoryID) {
        l.info(`${this.constructor.name}.findCategory(${categoryID})`);
        return new Promise((resolve, reject) => {

            if (categoryID === 'CategoryTitles') {

                INewsCategory.find({}, (err, NewsCategory) => {
                    if (err) {
                        reject(err);
                    } else {

                    //Getting the categories of each major category in the db
                    let Categories = [];
                    for(let category of NewsCategory){
                        let categoryItem = {
                        Name: category.Category,
                        _id: category._id
                        };

                        Categories.push(categoryItem);
                    }

                    resolve({
                        categoryTitles: Categories
                    });
                    }
                });
            
            } else if(categoryID === 'PopularData') {

                INewsCategory.findOne({'Category': 'Politics'}, function(err, category) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(category);
                    }
                });
            
            } else {

                INewsCategory.findById(categoryID, (err, category) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(category);
                    }
                });

            }
        });
    }

    findCategories() {
        l.info(`${this.constructor.name}.findCategories()`);
        return new Promise((resolve, reject) => {
            INewsCategory.find({}, (err, NewsCategory) => {
                if (err) {
                    reject(err);
                } else {

                            //Getting the categories of each major category in the db
                    var Categories = [];
                    for(var category of NewsCategory){
                    Categories.push(category.Category);
                    //console.log(JSON.stringify(category))
                    }
                    //console.log(JSON.stringify(NewsCategory.length))

                    //I think that we need to create a method that will do this in a
                    //randomly fashion so that it can look cool.
                    var structuredCategory = [];
                    var innerDoublePart = [];
                    console.log(NewsCategory.length + '  length');
                    for(let i = 0; i < NewsCategory.length; i++){
                    if(i === 1) {
                        innerDoublePart.push(NewsCategory[i]);
                    }else if( i === 2) {
                        innerDoublePart.push(NewsCategory[i]);
                    }else if(i === 3){
                        structuredCategory.push(innerDoublePart);
                        structuredCategory.push(NewsCategory[i]);
                    }else{
                        structuredCategory.push(NewsCategory[i]);
                    }
                    }


                    resolve({
                        newsCategory: NewsCategory,
                        structuredNewsCategory: structuredCategory,
                        category: Categories
                    });
                }
            });
        });
    }

    saveArticle(categoryID, iNewsArticle) {
        new Promise((resolve, reject) => {
            INewsCategory.findById(categoryID, (err, category) => {
                if (err) {
                    reject(err);
                } else {

                    console.log(iNewsArticle.category); // Did this so that the error can go away
                    var entry = new INewsArticle({

                    });

                    category.INewsArticles.add(entry);
                    
                    category.save(function (err, product, article) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(article);
                    }
                    });
                }
            });
        });
    }

    saveCategory(iNewsCategory) {
        new Promise((resolve, reject) => {
            var entry = new INewsCategory({
                Type: iNewsCategory.Type,
                INewsArticles: iNewsCategory.INewsArticles
            });

            entry.save(function (err, product) {
                if(err) {
                    reject(err);
                } else {
                    resolve(product);
                }
            });
        });
    }
}

export default new NewsGaloreService();