const logEvent = require('../events/logging.listener');
const Content = require('../models/content.model');
const User = require('../models/user.model')
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
            result = await Content.findOne({
                where: { id: id },
                include: { model: User, as: Users }
            });
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
    async updateContent(newContent) {
        const content = await Content.findOne({ where: { nomor_peraturan: newContent.nomor_peraturan } });
        _.map(newContent, (prop) => {
            content.prop = newContent.prop;
        });
        let result;
        try {
            result = await content.save();
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'UPDATE-CONTENT-SERVICE-FAILED',
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