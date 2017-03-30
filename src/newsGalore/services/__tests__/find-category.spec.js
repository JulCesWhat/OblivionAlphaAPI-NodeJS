'use strict';

jest.mock('./../find-category')
const getCategoryCtrl = require('../../controllers/getCategory');

describe('src/users/controllers/find-allUsers', () => {
  test('should find all the user stored in the database', () => {

    const req = {
        params : {
            categoryID: "00001111"
        }
    }

    const res = {
      json : jest.fn()
    };
    const next = jest.fn();

    return getCategoryCtrl(req, res, next)
      .then(() => {
        expect(res.json.mock.calls.length).toBe(1);
        //expect(res.send.mock.calls[0][0]).toEqual('capi.vara\nJames.elTrabajador\n');
      });
  });
});
