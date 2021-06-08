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
                include: [
                    { model: User, as: 'Users', attributes: { exclude: ['User_Profiles'] }, },
                ]
            })
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
        const content = await Content.findOne({ where: { id: newContent.id } });
        content.judul = newContent.judul
        content.nama_file = newContent.nama_file
        content.nomor_peraturan = newContent.nomor_peraturan
        content.jenis_peraturan = newContent.jenis_peraturan
        content.tempat_penetapan = newContent.tempat_penetapan
        content.tanggal_pengundagan = newContent.tanggal_pengundagan
        content.bidang_hukum = newContent.bidang_hukum
        content.tanggal_penetapan = newContent.tanggal_penetapan
        content.bahasa = newContent.bahasa
        content.pemrakasa = newContent.pemrakasa
        content.penandatangan = newContent.penandatangan
        content.subjek = newContent.subjek
        content.description = newContent.description
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