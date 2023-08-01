const ModelUser = require('../model/model-user');

class MiddlewareAuth {
    constructor() { }

    passport = (req, res, next) => {
        let token = req.get('authorization');

        ModelUser.userPassport((users) => {
            let user = users.find((user) => user.token === token);

            if(user) {
                next();

            } else {
                res.status(401).json({status: false, message: 'Unauthorized'});
            }
        })
    }
}

module.exports = new MiddlewareAuth();