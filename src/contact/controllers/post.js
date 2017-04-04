

const createEmail = require('../services/create-email');

module.exports = (req, res, next) => {
  console.log(JSON.stringify(req.body));
  const newUser = req.body;
  if (!req.body) {
    const err = new Error('User can\'t be added because the body is empty.');
    err.status = 400;
    return next(err);
  }

  return createEmail(newUser)
    .then(user => res.json(user))
    .catch(next);
};
