const Sequelize = require('sequelize');
const connection = require('../../config/dbConn');

const Content = connection.define('Content', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nama_file: {
        type: Sequelize.STRING
    },
    nomor_peraturan: {
        type: Sequelize.INTEGER
    },
    jenis_peraturan: {
        type: Sequelize.STRING
    },
    tempat_penetapan: {
        type: Sequelize.STRING
    },
    tanggal_pengundagan: {
        type: Sequelize.DATEONLY
    },
    bidang_hukum: {
        type: Sequelize.STRING
    },
    tanggal_penetapan: {
        type: Sequelize.DATEONLY
    },
    bahasa: {
        type: Sequelize.STRING
    },
    pemrakasa: {
        type: Sequelize.STRING
    },
    penandatangan: {
        type: Sequelize.STRING
    },
    subjek: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
}, {
    freezeTableName: true,
    tableName: 'content',
    paranoid: true,
});

module.exports = Content;