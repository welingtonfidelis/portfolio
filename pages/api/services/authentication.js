const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET = process.env.JWT_SECRET;

module.exports = {
    createToken(obj, expiresIn = '8h') {

        return jwt.sign(
            { ...obj }, SECRET, { expiresIn }
        );
    },
    
    validateToken(req, ignoreExpiration = false) {
        const { authorization } = req.headers;

        if (!authorization) {
            throw {
                code: 401,
                message: "Authorization is required"
            }
        }

        jwt.verify(authorization, SECRET, { ignoreExpiration }, function (err, decoded) {
            if (err) {
                throw {
                    message: 'Invalid Authorization',
                    code: 401
                };
            }

            Object.entries(decoded).forEach(el => {
                req.headers[el[0]] = el[1];
            });
        });
        return true;
    },

    async validatePassword(password, hash) {
        return await bcrypt.compareSync(password, hash);
    },
}