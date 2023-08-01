const path = require('path');
const fs = require('fs');

class ModelUser {

    constructor() { }

    userPassport = (callback) => {
        fs.readFile(path.join(__dirname, '../', 'db', 'userToken.json'), {encoding: 'utf-8'}, (err, data) => {
            let users = JSON.parse(data);
            callback(users);
        })

    }

}

module.exports = new ModelUser();