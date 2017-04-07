

const emailCheck = require('email-check'),
      mailer    = require('nodemailer'),
      emailConfig  = require('./../../lib/configLoader').emailConfig;

module.exports = contactMsg => {
  return new Promise((resolve, reject) => {
    let emailGroup = contactMsg.emailGroup;

	  //Here we will store in the dB and send it to me :)
    emailCheck(emailGroup.email)
      .then((res) => {
        if (res) {
          
          //If the email could be verified
          sendEmail(contactMsg, emailGroup.email)
            .then(reponse => resolve(response))
            .catch(err => reject(err));

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
      })
  });
}

function sendEmail(contactMsg, email) {
    // Use Smtp Protocol to send Email
    const smtpTransport = mailer.createTransport({
      service: "Gmail",
      port: 465,
      secure: true, // use TLS
      auth: {
        user: emailConfig.USER,
        pass: emailConfig.PASS
        } 
    });

    const mail = {
      from: "Oblivion Alpha FrontEnd <wispersofoblivion@gmail.com>",
      to: "wispersofoblivion@gmail.com",
      subject: contactMsg.name + " <" + email + ">",
      text: contactMsg.message
    }


  return new Promise((resolve, reject) => {
    smtpTransport.sendMail(mail, function(error, response) {

      smtpTransport.close();
      if (error) {
        //console.log(error)
        reject(error);
      } else {
        //console.log("Message sent: " + response.message);
        resolve(response);
      }
    });
  })
};