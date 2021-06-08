const logEvent = require('../events/logging.listener');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const Content = require('../models/content.model');

async function hashPassword(password) {
    return await bcrypt.hash(password, 8);
}

class UserService {
    async getAllUser() {
        let result;
        try {
            result = await User.findAll();
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'GET-ALL-USER-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return result;
    }
    async getUserById(id) {
        let result;
        try {
            result = await User.findOne({
                where: { id: id },
                include: [
                    { model: Content, as: 'Contents', attributes: { exclude: ['User_Profiles'] }, },
                ]
            })
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'GET-USER-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return result;
    }
    async createUser(newUser) {
        let result;
        try {
            const hashedPassword = await hashPassword(newUser.password);
            newUser.password = hashedPassword;
            result = await User.create(newUser);
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'CREATE-USER-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return result;
    }
    async deleteUserById(id) {
        const user = await user.findByPk(id)
        let result;
        try {
            result = await user.destroy();
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'DELETE-USER-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return result;
    }
}
module.exports = UserService