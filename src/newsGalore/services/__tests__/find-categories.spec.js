'use strict';

jest.mock('./../find-categories')
const getCategoriesCtrl = require('../../controllers/getCategories');

describe('src/newsGalore/controllers/getCategories', () => {
  test('should find all the categories from the dataBase', () => {

    const req = jest.fn();

    const res = {
      json : jest.fn()
    };
    const next = jest.fn();

    return getCategoriesCtrl(req, res, next)
      .then(() => {
        expect(res.json.mock.calls.length).toBe(1);
        //expect(res.send.mock.calls[0][0]).toEqual('capi.vara\nJames.elTrabajador\n');
      });
  });
});
