'use strict';

const findUser = require("../services/find-user");

module.exports = function (req, res, next) {

  findUser(eq.params.uuid)
    .then(user => res.json(user))
    .catch(next);
}
