

const mailer       = require('nodemailer'),
      emailConfig  = require('./../../lib/configLoader').emailConfig;

module.exports = contactMsg => {
  // Use Smtp Protocol to send Email
  let emailGroup = contactMsg.emailGroup;
  const smtpTransport = mailer.createTransport({
    service: 'Gmail',
    port: 465,
    secure: true, // use TLS
    auth: {
      user: emailConfig.USER,
      pass: emailConfig.PASS
    } 
  });

  const mail = {
    from: 'Oblivion Alpha FrontEnd <wispersofoblivion@gmail.com>',
    to: 'wispersofoblivion@gmail.com',
    subject: contactMsg.name + ' <' + emailGroup.email + '>',
    text: contactMsg.message
  };

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
  });
};