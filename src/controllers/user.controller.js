const { userService } = require('../service')

const createUser = async (req, res) => {
    try {
        await userService.createUser(req, res);
    } catch (err) {
        console.log("error", err);
    }
};

const getAll = async (req, res) => {
    try {
        await userService.getAll(req, res);
    } catch (err) {
        console.log("error", err);
    }
};

const get = async (req, res) => {
    try {
        await userService.getUser(req, res);
    } catch (err) {
        console.log("error", err);
    }
};
const update = async (req, res) => {
    try {
        await userService.updateUser(req, res);
    } catch (err) {
        console.log("error", err);
    }
};

const destory = async (req, res) => {
    try {
        await userService.destoryUser(req, res);
    } catch (err) {
        console.log("error", err);
    }

};


module.exports = {
    createUser,
    getAll,
    get,
    update,
    destory
};