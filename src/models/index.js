const User = require('./user.model')
const Content = require('./content.model')
const dbAssociation = function dbAssociation() {
    Content.belongsToMany(User, { through: 'User_Profiles' });
    User.belongsToMany(Content, { through: 'User_Profiles' });
}

module.exports = dbAssociation;