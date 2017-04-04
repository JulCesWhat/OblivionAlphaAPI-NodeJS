

//const database = require('../../lib/database/NEdatabase');
const emailCheck = require('email-check'),
      mailer    = require('nodemailer'),
      emailConfig  = require('./../../lib/configLoader').emailConfig;

module.exports = userEmail =>
  new Promise((resolve, reject) => {
	//Here we will store in the dB and send it to me :)
    emailCheck(userEmail)
      .then(function (res) {
        // Use Smtp Protocol to send Email
        var smtpTransport = mailer.createTransport("SMTP",{
          service: "Gmail",
            auth: {
                user: emailConfig.USER,
                pass: emailConfig.PASS
              
            } 
        });

        var mail = {
          from: "Yashwant Chavan <from@gmail.com>",
          to: "userhere@gmail.com",
          subject: "Send Email Using Node.js",
          text: "Node.js New world for me",
          html: "<b>Node.js New world for me</b>"
        }

        smtpTransport.sendMail(mail, function(error, response){
          if (error) {
            console.log(error);
            reject(error);
          } else {
            console.log("Message sent: " + response.message);
            resolve(True);
          }

          smtpTransport.close();
          
        });
      })
      .catch(function(err) {
        if (err.message === 'refuse') {
          // The MX server is refusing requests from your IP address.
          reject(err);
        } else {
          // Decide what to do with other errors.
          reject(err);
        }
      })
  });
