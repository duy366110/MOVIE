const path = require('path');
const fs = require('fs');
const moment = require('moment');

class ModelMovie {
    path = path.join(__dirname, "../", 'db', 'movieList.json');

    constructor() { }


    findMoviesByGenres = (page, type, callback) => {

        return fs.readFile(this.path, {encoding: 'utf-8'}, (err, data) => {
            if(err) callback([]);

            let movies = JSON.parse(data);
            movies = movies.filter((movie) => movie.genre_ids.some((category) => category == type)).map((elm) => {
                elm.key = Math.random().toString();
                return elm;
            });

            callback(movies.slice(page, movies.length));

        })
    }

    findTrailerMovieById = (movie_id, callback) => {
        return fs.readFile(path.join(__dirname, "../", 'db', 'videoList.json'), {encoding: 'utf-8'}, (err, data) => {
            if(err) callback([]);

            let trailers = JSON.parse(data);
            let trailer = trailers.find((video) => video.id.toString() === movie_id.toString());

            if(trailer?.hasOwnProperty('videos') && trailer.videos.length) {            
                trailer.videos = trailer.videos.sort((firstVideo, lastVideo) => firstVideo.published_at > lastVideo.published_at? -1 : 1).filter((video) =>  (video.official === true && video.site  === 'YouTube'));
            }

            callback(trailer);
        })
    }

    findMovieType = (type, page, callback) => {
        fs.readFile(path.join(__dirname, '../', 'db', 'movieList.json'), {encoding: 'utf-8'}, (err, data) => {
            let movieList = [];
            let movies = JSON.parse(data);

            switch(type) {
                case 'rating':
                    movies = movies.sort((movieFirst, movieLast) => (Number(movieFirst?.vote_average) - Number(movieLast?.vote_average))? -1 : 1).map((movie) => {
                        movie.key = Math.random().toString();
                        return movie;
                    });
                    break;
    
                case 'trending':
                default:

                    movies = movies.sort((movieFirst, movieLast) => (Number(movieFirst?.popularity) - Number(movieLast?.popularity))? -1 : 1).map((movie) => {
                        movie.key = Math.random().toString();
                        return movie;
                    });

                    break;
            }

            if(movies.length) {
                for(let index = page; movieList.length < 20; index++) {
                    movieList.push(movies[index]);
                }
            }

            callback(movieList);
        })
    }

    searchMovie = (keyword, genres, media, language, year, callback) => {
        return fs.readFile(path.join(__dirname, "../", 'db', 'movieList.json'), {encoding: 'utf-8'}, (err, data) => {
            let movies = [];

            if(keyword || genres || media || language || year) {
                movies = JSON.parse(data);

                if(keyword) {
                    movies = movies.filter((movies) => movies?.title?.toLowerCase()?.includes(keyword) || movies?.overview?.toLowerCase()?.includes(keyword));
                }

                if(genres) {
                    movies = movies.filter((movies) => movies?.genre_ids?.some((id) => id == genres));
                }

                if(media) {
                    movies = movies.filter((movies) => movies?.media_type?.toLowerCase()?.includes(media));
                }

                if(language) {
                    movies = movies.filter((movies) => movies?.original_language?.toLowerCase()?.includes(language));
                }

                if(year) {
                    movies = movies.filter((movies) => movies?.first_air_date?.toLowerCase()?.includes(year));
                }

                movies.map((movie) => {
                    movie.key = Math.random().toString();
                    return movie;
                })
            }

            callback(movies);
        })
    }

}

module.exports = new ModelMovie();