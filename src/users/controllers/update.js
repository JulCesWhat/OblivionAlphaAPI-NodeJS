'use strict';

const updateUser = require("../services/update-user");

module.exports = function (req, res, next) {
  if(!req.body) {
    var userErr = new Error('User not found.');
    userErr.status = 404;
    return next(userErr);
  }

  updateUser(req.params.uuid, req.body)
    .then(updatedUser => res.json(updatedUser))
    .catch(next);
}
