const mongoose = require('mongoose');
const User = mongoose.model('User');

const createUser = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ 'message': 'User already exist', user });
    } else {
        try {
            let user = await User.create({
                fullName: req.body.name,
                email: req.body.email,
                userName: req.body.userName,
                role: req.body.role,
                password: req.body.password || ''
            });
            return res.status(200).json({ 'message': user });
        } catch (err) {
            return res.status(400).json({ 'message': `${err}` || JSON.stringify(error) });
        }
    }

}

const getAll = async (req, res) => {
    let users = await User.find({});

    var userMap = {};
    users.forEach(function (user) {
        userMap[user._id] = user;
    });
    res.send(userMap);
}

const getUser = async (req, res) => {
    try {
        let user = await User.findOne(
            {
                _id: req.params.user_id
            }
        );
        res.status(200).json({ 'message': user });
    } catch (err) {
        res.status(404).json({ 'message': `${err}` || JSON.stringify(error) });
    }

}

const updateUser = async (req, res) => {
    let user = await User.findOne({ _id: req.params.user_id });

    if (!user) {
        res.status(404).json({ 'message': 'User not found' });
    } else {
        user.email = req.body.email;
        user.fullName = req.body.name;
        user.userName = req.body.userName;
        user.role = req.body.role;
        user.save();
        res.status(200).json({ 'message': 'Successly updated!', user });
    }

}

const destoryUser = async (req, res) => {
    try {
        let user = await User.deleteOne({ _id: req.params.user_id });
        if (user.deletedCount == 1) {
            res.status(200).json({ 'message': 'Removed successfully' });
        } else {
            res.status(404).json({ 'message': 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ 'message': `${err}` || JSON.stringify(error)});
    }
    
}

module.exports = {
    createUser,
    getAll,
    getUser,
    updateUser,
    destoryUser
};