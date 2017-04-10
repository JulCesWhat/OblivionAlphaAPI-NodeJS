'use strict';

jest.mock('./../send-email');
jest.mock('./../verify-email');
const getArticleCtrl = require('../../controllers/post');

describe('src/newsGalore/services/verify-email', () => {
  test('should verify the email exists', () => {

    const req = {
      body: {
        emailGroup: {
		      email: 'Shishi@gmail.com'
		    },
		    name: 'Shishi',
        message: 'This is Shishi!!!'
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

  test('should break when trying to find the email', () => {
    const req = {
      body: {
        emailGroup: {
		      email: 'Shishi@gmail.com'
		    },
		    name: 'Capivara',
        message: 'This is capivara!!!'
      }
    };

    const res = {
      json : jest.fn()
    };
    const next = jest.fn();

    return getArticleCtrl(req, res, next)
            .catch(e => expect(e).toEqual({
              error : 'Error while trying to send the email.'
            }));
  });

  test('should break in the beginning of the post', () => {
    const req = {
      body: {
      }
    };

    const res = {
      json : jest.fn()
    };
    const next = jest.fn();

    return getArticleCtrl(req, res, next)
    expect(next.mock.calls[0][0].message).toEqual('User can\'t be added because the body is empty.');
  });
});