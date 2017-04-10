 

 module.exports = contactMsg => {

  return new Promise((resolve, reject) => {
    let emailGroup = contactMsg.emailGroup;

		if (emailGroup.email === 'Shishi@gmail.com') {
			// We take this as the email exits
			resolve(contactMsg);
		} else {
			// We take this as the email does not exist
			reject(new Error('The imputed email could not be verified.'));
		}
  });
};