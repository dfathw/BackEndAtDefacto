const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

dotenv.config();

class AuthService {
    async authenticate(user) {
        const { user_name, password } = user;
        let authUser;
        try {
            authUser = await User.findOne({
                where: {
                    user_name: user_name,
                }
            });
            const matchPassword = bcrypt.compareSync(password, authUser.password);
            if (matchPassword) {
                const expiresIn = 10000;
                const accessToken = jwt.sign({ id: authUser.id }, process.env.SECRET_KEY, {
                    expiresIn: expiresIn
                });
                authUser = {
                    message: `Authentication Success`,
                    user: {
                        userId: authUser.id,
                        userName: authUser.user_name,
                    },
                    token: accessToken
                };
            } else {
                authUser = null;
            }
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'GET-PRODUCT-SERVICE-FAILED',
                logMessage: e
            });
            throw new Error(e);
        }
        return authUser;
    }
}

module.exports = AuthService;