const environment = require("../environment");

class MiddlewareCors {

    constrcutor() { }

    accept(req, res, next) {
        let origin = req.get('origin');

        if(environment.cors.origins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-Custom-Header, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
            next();
        }
    }
}

module.exports = new MiddlewareCors();