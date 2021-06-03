const jwt = require('jsonwebtoken');

const tokenValidation = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        jwt.verify(authorization, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.sendStatus(401);
            } else {
                const decodedToken = decoded;
                if (Date.now() >= decodedToken.exp * 10000) {
                    res.sendStatus(401)
                } else {
                    next();
                }
            }
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports = tokenValidation;