const ModelMovie = require("../model/model-movie");

class ControllerMovie {

    constructor() { }

    getMovieByGenres = (req, res, next) => {
        const { page, genres } = req.query;

        if(genres) {
            ModelMovie.findMoviesByGenres(page, genres, (movies) => {
                if(movies) {
                    return res.status(200).json({status: true, message: 'Has Content', results: movies});
        
                } else {
                    return res.status(400).json({status: true, message: 'Not found that gerne id', results: []});
        
                }
            });

        } else {
            return res.status(400).json({status: false, message: 'Not found gerne param'});
        }
    }

    getMovieTrailerById = (req, res, next) => {
        let { movie_id } = req.query;

        if(movie_id) {
            ModelMovie.findTrailerMovieById(movie_id, (trailer) => {
                if(trailer) {
                    return res.status(200).json({status: true, message: 'Has Content', results: trailer});
    
                } else {
                    let team = 
                        {
                            "id": movie_id,
                            "videos": [
                                {
                                    "iso_639_1": "en",
                                    "iso_3166_1": "US",
                                    "name": "\"Tom's P51 Mustang\" Featurette",
                                    "key": "t-yxjQAVcbs",
                                    "site": "YouTube",
                                    "size": 1080,
                                    "type": "Behind the Scenes",
                                    "official": true,
                                    "published_at": "2022-08-26T15:59:50.000Z",
                                    "id": "63094f3818864b0080e4251a"
                                }
                            ]
                        };
                    
                    return res.status(404).json({status: true, message: 'Not found video', results: team});
    
                }
    
            })

        } else {
            return res.status(400).json({status: true, message: 'Not found film_id parram', results: null});
        }
    }

    getMovieTrending = (req, res, next) => {
        let { type, page } = req.query;

        ModelMovie.findMovieType(type, page, (movies) => {
            return res.status(200).json({status: true, message: 'Has movie trending', results: movies});
        })
    }

    getMovieSearch = (req, res, next) => {
        const { keyword, genres, media, language, year } = req.query;
        
        ModelMovie.searchMovie(keyword, genres, media, language, year, (movies) => {
            return res.status(200).json({status: true, message: 'Has movie trending', results: movies});

        })

    }

}

module.exports = new ControllerMovie();