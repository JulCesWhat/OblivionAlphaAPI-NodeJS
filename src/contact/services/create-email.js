

//const database = require('../../lib/database/NEdatabase');
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
          //The email exits. :)
          sendEmail(contactMsg)
            .then(() => resolve(true))
            .catch(() => reject(false));
        } else {
          //The email does not exist. :)
          reject(false);
        }
      })
      .catch((err) =>  {
        if (err.message === 'refuse') {
          // The MX server is refusing requests from your IP address.
          reject(false);
        } else {
          // Decide what to do with other errors.
          reject(false);
        }
      })
  });

function sendEmail(contactMsg, email) {
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
      subject: contactMsg.name + " <" + email + ">",
      text: contactMsg.message
    }

    smtpTransport.sendMail(mail, function(error, response){
      if (error) {
        //console.log('This is error when trying to send the eamil!!!!!!!!!!!!')
        //console.log(error);
        smtpTransport.close();
        reject(error);
      } else {
        console.log("Message sent: " + response.message);
        smtpTransport.close();
        resolve(response);
      }
    });
  });
};
}