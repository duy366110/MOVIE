const router = require('express').Router();
const RouterMovie = require("./router-movie");


router.use('/movie', RouterMovie);

module.exports = router;