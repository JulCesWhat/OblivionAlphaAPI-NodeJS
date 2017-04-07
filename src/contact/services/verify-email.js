

const emailCheck = require('email-check');

module.exports = contactMsg => {

  return new Promise((resolve, reject) => {
    let emailGroup = contactMsg.emailGroup;

  //Here we will store in the dB and send it to me :)
  emailCheck(emailGroup.email)
    .then((res) => {
      if (res) {
        resolve(contactMsg);
      } else {
      
        //The email does not exist or could not be verified
        const err = new Error('The entered email could not be verified.');
        err.status = 500;
        reject(err);
      }
    })
    .catch((err) =>  {
      if (err.message === 'refuse') {
        // The MX server is refusing requests from your IP address.
        //console.log((err.message))
        reject(err);
      } else {
        //console.log(err.message);
        // Decide what to do with other errors.
        reject(err);
      }
    });
  });
};