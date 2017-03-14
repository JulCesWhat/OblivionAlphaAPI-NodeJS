'use strict';

const createUser = require("../services/create-user");

module.exports = function (req, res, next) {
  var userBody = req.body;

  createUser(userBody)
    .then(users => res.json(users))
    .catch(next);
}
