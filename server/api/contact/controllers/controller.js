
import ContactService from './../services/contact.service';

export class Controller {

    sendEmail(req, res, next) {
        let contactMsg = req.body;

        if (!contactMsg.name || !contactMsg.message || !contactMsg.email) {
            const err = new Error('User can\'t be added because the body is empty.');
            err.status = 400;
            return next(err);
        }

        ContactService
            .sendEmail(contactMsg)
                .then(email => res.json(email))
                .catch(next);
    }

}
export default new Controller();