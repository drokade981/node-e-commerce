const Jwt = require('jsonwebtoken');
const JwtKey = 'node-e-comm';

module.exports = async (req, resp, next) => {
    let token = req.headers.authorization;
    if (token) {
        token = token.split(' ');
        Jwt.verify(token[1], JwtKey, (err, success) => {
            if (err) {
                resp.status(401).json({ status: false, message: 'Unauthorized access' });
            } else {
                next();
            }
        })
    } else {
        resp.status(403).json({ status: false, message: 'please provide token' });
    }


}