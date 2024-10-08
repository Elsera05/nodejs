const verify = require('jsonwebtoken/verify');
const { verifyToken } = require('../helpers/jwt')
const UserModel = require('../models/users');
const user = new UserModel();
async function authorize(req, res, next) {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) return res.status(401).json({ message: 'Unauthorized' })
        const token = bearerToken.split(' ')[1]; //maka dilakukan split toke atau bearen{token}
        const payload = verifyToken(token);

        req.user = await user.getById(payload.id)
        next();
    } catch (e) {
        console.log(e);
        next(e);
    }
}
 function checkRole(roles) {
    return (req, res, next) => {
        if (!roles.includes(req.res.role))
            return res.status(403).json({ message: 'forbidden' });
        next();
    }
}

module.exports = { authorize, checkRole }