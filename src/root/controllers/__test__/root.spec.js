'use strict';

const messageCtrl = require('../get');

describe('src/root/controllers/get', () => {
  test('should call res.json when request is made to root url', () => {
    const req = {};
    const res = {
      json: jest.fn()
    };
    const next = jest.fn();

    messageCtrl(req, res, next);
    expect(res.json.mock.calls.length).toBe(1);
  });
});
