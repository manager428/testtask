const mongoose = require('mongoose');
const {sign} = require('jsonwebtoken');
const User = mongoose.model('User');
require('dotenv').config();

const login = async (req, res) => {
    
	let user = await User.findOne({ 'email': req.body.email });
    if (!user) {
        res.status(203).json({
            error: 'User not found'
        });
    }

    if (user && !user.authenticate(req.body.password)) {

        res.status(201).json({
            error: 'Email and password don\'t match.'
        });
    }

    if(user && user.authenticate(req.body.password) && user.role != 'admin') {
        res.status(401).json({
            error: 'Permission error'
        });
    }

    if(user && user.authenticate(req.body.password) && user.role == 'admin') {
        let token = sign({user}, process.env.SECRET);
        let expiredDate = new Date(new Date().getDate() + 10);
        res.cookie('session', token, {
            maxAge: expiredDate,
        });
        console.log('token  is ', token);

        res.status(200).json({token, user});
    }
}

module.exports = {
    login,
};