const logEvent = require('../events/logging.listener');
const Content = require('../models/content.model');
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    return await bcrypt.hash(password, 8);
}

class UserService {
    async getAllContent() {
        let result;
        try {
            result = await Content.findAll();
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'GET-ALL-Content-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return result;
    }
    async getContentById(id) {
        let result;
        try {
            result = await Content.findByPk(id);
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'GET-CONTENT-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return result;
    }
    async createContent(newContent) {
        let result;
        try {
            result = await Content.create(newContent);
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'CREATE-CONTENT-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return result;
    }
    async deleteContentById(id) {
        const user = await Content.findByPk(id)
        let result;
        try {
            result = await user.destroy();
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'DELETE-CONTENT-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return result;
    }
}
module.exports = UserService