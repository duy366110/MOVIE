const router = require("express").Router();
const ControllerGenres  = require("../controller/controller-genres");
const ControllerMovie = require("../controller/controller-movie");
const MiddlewareAuth = require("../middleware/middleware-auth");

router.get("/genres", MiddlewareAuth.passport, ControllerGenres.getGenres);
router.get('/discover', MiddlewareAuth.passport, ControllerMovie.getMovieByGenres);
router.get('/trailer', MiddlewareAuth.passport, ControllerMovie.getMovieTrailerById);
router.get('/topic', MiddlewareAuth.passport, ControllerMovie.getMovieTrending);
router.get('/search', MiddlewareAuth.passport, ControllerMovie.getMovieSearch);

module.exports = router;