'use strict';

jest.mock('./../find-article');
const getArticleCtrl = require('../../controllers/getArticle');

describe('src/newsGalore/services/find-article', () => {
  test('should return an article from inside a category from the dataBase', () => {

    const req = {
      params : {
        "categoryID": "11110000",
        "articleID": "00001111"
      }
    };

    const res = {
      json : jest.fn()
    };
    const next = jest.fn();

    return getArticleCtrl(req, res, next)
      .then(() => {
        expect(res.json.mock.calls.length).toBe(1);
        //expect(res.json.mock.calls[0][0].name).toEqual("Julio.Whatley");
      });
  });
});
