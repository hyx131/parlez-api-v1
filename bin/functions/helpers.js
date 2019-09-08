const bcrypt = require('bcrypt');
const {getUserByEmailDB, addUserDB} = require('../db/helpers/sub-authQueries');

const generateHashedPassword = (password) => {
	return bcrypt.hashSync(password, 10);
};

const emailExists = (email) => {
	return getUserByEmailDB(email).then((result) => {
		if (result) {
			return result.email;
		}
		return false;
	});
};

const validatePassword = (email, password) => {
	return getUserByEmailDB(email).then((user) => {
		return bcrypt.compare(password, user.password);
	});
};

const addUser = (username, email, password) => {
	addUserDB(username, email, generateHashedPassword(password)).then((newUser) => {
		if (newUser) {
			return newUser;
		}
		throw new Error();
	});
};

module.exports = {addUser, validatePassword, emailExists};