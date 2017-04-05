

//const database = require('../../lib/database/NEdatabase');
const emailCheck = require('email-check'),
      mailer    = require('nodemailer'),
      emailConfig  = require('./../../lib/configLoader').emailConfig;

module.exports = contactMsg =>
  new Promise((resolve, reject) => {
	//Here we will store in the dB and send it to me :)
    emailCheck(contactMsg.email)
      .then(function (res) {
        sendEmail(contactMsg)
          .then(resolve(true))
          .catch(reject(err));
      })
      .catch(function(err) {
        if (err.message === 'refuse') {
          // The MX server is refusing requests from your IP address.
          
          this.sendEmail(contactMsg)
            .then(resolve(true))
            .catch(reject(err));
        } else {
          // Decide what to do with other errors.
          reject(err);
        }
      })
  });

function sendEmail(contactMsg) {
  return new Promise((resolve, reject) => {
    // Use Smtp Protocol to send Email
    var smtpTransport = mailer.createTransport({
      service: "Gmail",
      port: 465,
      secure: true, // use TLS
      auth: {
        user: emailConfig.USER,
        pass: emailConfig.PASS
        } 
    });

    var mail = {
      from: "Oblivion Alpha FrontEnd <wispersofoblivion@gmail.com>",
      to: "wispersofoblivion@gmail.com",
      subject: contactMsg.name + " <" + contactMsg.email + ">",
      text: contactMsg.message
    }

    smtpTransport.sendMail(mail, function(error, response){
      if (error) {
        console.log(error);
        smtpTransport.close();
        reject(error);
      } else {
        console.log("Message sent: " + response.message);
        smtpTransport.close();
        resolve(True);
      }
    });
  });
};