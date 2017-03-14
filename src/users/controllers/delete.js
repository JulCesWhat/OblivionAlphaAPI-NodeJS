'use strict';

const deleteUser = require("../services/delete-user");

module.exports = function (req, res, next) {
  
  deleteUser(req.params.uuid)
    .then(deletedUser => res.json(deletedUser))
    .catch(next);

}
