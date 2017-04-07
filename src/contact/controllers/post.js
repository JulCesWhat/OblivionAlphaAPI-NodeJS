

const verifyEmail = require('./../services/verify-email'),
      sendEmail   = require('./../services/send-email');

module.exports = (req, res, next) => {

  let contactMsg = req.body;
  if (!req.body) {
    console.log("Are we here???")
    const err = new Error('User can\'t be added because the body is empty.');
    err.status = 400;
    return next(err);
  }

  return verifyEmail(contactMsg)
          .then(sendEmail)
          .then(email => res.json(email))
          .catch(next);
};
