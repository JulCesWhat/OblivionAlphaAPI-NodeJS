 

module.exports = contactMsg => {

  return new Promise((resolve, reject) => {
		if (contactMsg.name === 'Shishi') {
			// We take this as the email has successfully been sent
			resolve('The email has been sent correctly');
		} else {
			// We take this as the email has not been successfully sent
			reject(new Error('Error while trying to send the email.'));
		}
  });
};