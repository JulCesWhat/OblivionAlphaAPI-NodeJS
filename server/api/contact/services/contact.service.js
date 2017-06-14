
import * as mailer from 'nodemailer';
import l from './../../../common/logger';

export class ContactService {

    sendEmail(contactMsg) {
        // Use Smtp Protocol to send Email
        const smtpTransport = mailer.createTransport({
            service: 'Gmail',
            port: 465,
            secure: true, // use TLS
            auth: {
                user: "",
                pass: ""
            }
        });

        const mail = {
            from: 'Oblivion Alpha FrontEnd <wispersofoblivion@gmail.com>',
            to: 'wispersofoblivion@gmail.com',
            subject: contactMsg.name + ' <' + contactMsg.email + '>',
            text: contactMsg.message
        };
        
        l.info(`${this.constructor.name}.sendEmail(${contactMsg})`);
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
    }

/*                              THIS HAS PROBLEMS
    verifyEmail(contactMsg) {
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
    }
*/
}

export default new ContactService();