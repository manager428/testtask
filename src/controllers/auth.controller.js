const { authService, userService } = require('../service')
const jwt = require('express-jwt');

const registerUser = async (req, res) => {
	try {
		await userService.createUser(req, res);
	} catch (err) {
		console.log("error", err);
	}

};

const login = async (req, res) => {
	try {
		await authService.login(req, res);
	} catch (err) {
		console.log('error', err);
	}
};

const logout = async (req, res) => {
	res.clearCookie('session');
	return res.status('200').json({
		message: 'signed out'
	});
};

const authMiddleware = jwt({
	secret: process.env.SECRET,
	userProperty: 'auth'
});

const hasAuthorization = (req, res, next) => {
	let authorized = req.profile && req.auth && req.profile._id == req.auth._id;
	if (!(authorized)) {
		return res.status('403').json({
			error: 'User is not authorized'
		});
	}
	next();
};

module.exports = {
	registerUser,
	login,
	logout,
	authMiddleware,
	hasAuthorization
};
