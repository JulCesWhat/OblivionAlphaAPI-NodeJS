'use strict';

const findAllUsers = require("../services/find-allUsers");

module.exports = function (req, res, next) {

  findAllUsers()
    .then(users => res.json(users))
    .catch(next);
}
