const ModelGenres = require("../model/model-genres");

class ControlerGenres {

    constructor() { }

    getGenres = (req, res, next) => {
        const genres = ModelGenres.genresFind();
        if(genres) {
            res.setHeader('Set-Cookie', 'cookie-server');
            res.status(200).json({status: true, message: 'Has Content', results: genres});

        } else {
            res.status(204).json({status: true, message: 'Not Found Content', results: []});

        }
    }

    

}

module.exports = new ControlerGenres();