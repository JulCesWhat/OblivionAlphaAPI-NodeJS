

const createEmail = require('../services/create-email');

module.exports = (req, res, next) => {
  console.log("We are here baby!!!!");
  const newUser = req.body;
  if (!req.body.name) {
    const err = new Error('User can\'t be added because the body is empty.');
    err.status = 400;
    return next(err);
  }

  return createEmail(newUser)
    .then(user => res.json(user))
    .catch(next);
};
