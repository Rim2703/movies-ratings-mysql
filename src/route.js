const express = require('express')
const router = express.Router()
const { getLongestMovies, createMovie, getTopMovies, getMoviesTotal, incrementRuntime } = require('./controller')

router.get('/longest-duration-movies', getLongestMovies)
router.post('/new-movie', createMovie)
router.get('/top-rated-movies', getTopMovies)
router.get('/genre-movies-with-subtotals', getMoviesTotal)
router.post('/update-runtime-minutes', incrementRuntime)

module.exports = router;