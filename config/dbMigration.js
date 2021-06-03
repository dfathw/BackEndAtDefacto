const Content = require('../src/models/content.model')
const User = require('../src/models/user.model')
const dbAssociation = require('../src/models/index');
const connection = require('./dbConn');
const bcrypt = require('bcrypt');
const { use } = require('../src/routes');

async function migration() {
    dbAssociation();
    await connection.sync({ force: true });
    await dataDummy();
};

async function dataDummy() {
    let user1 = await User.create({
        user_name: 'Yusri',
        password: bcrypt.hashSync('password', 8),
        email: 'ceritanya.email@ini.com'
    })
    let content1 = await Content.create({
        nama_file: '2020uu011.pdf',
        nomor_peraturan: 11,
        jenis_peraturan: 'Undang-Undang',
        tempat_penetapan: '-',
        tanggal_penetapan: '2020-11-02',
        bahasa: 'Indonesia',
        pemrakasa: '-',
        penandatangan: '-',
        subjek: 'Tenaga Kerja - Kemudahan Berusaha - UMKM',
        description: 'simplikasi ini di isi setelah ML kelar nyari intisarinya'
    })
    user1.addContent(content1);
}

migration();