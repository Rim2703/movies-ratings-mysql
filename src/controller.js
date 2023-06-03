const db = require('../db')
const queries = require('./queries')

// GET /api/v1/longest-duration-movies
const getLongestMovies = (req, res) => {
    try {
        db.query(queries.getLongDurMovie,
            (error, results) => {
                if (error) {
                    console.error('Error while executing query:', error)
                    res.status(500).json({ error: 'An error occurred' })
                } else {
                    res.json(results)
                }
            }
        )
    }
    catch (err) {
        res.status(500).json({ status: false, Error: err.message });
    }
}

const createMovie = (req, res) => {
    try {
        const { tconst, titleType, primaryTitle, runtimeMinutes, genres } = req.body;

        const values = [tconst, titleType, primaryTitle, runtimeMinutes, genres];

        db.query(
            queries.createMovie,
            values,
            (error) => {
                if (error) {
                    console.error('Error executing query:', error);
                    res.status(500).json({ error: 'An error occurred' });
                } else {
                    res.send('success')
                }
            }
        );

    }
    catch (err) {
        res.status(500).json({ status: false, Error: err.message });
    }
}


// GET /api/v1/top-rated-movies
const getTopMovies = (req, res) => {
    try {
        db.query(queries.getTopMoviesByRating,
            (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    res.status(500).json({ error: 'An error occurred' });
                } else {
                    res.json(results);
                }
            }
        )
    }
    catch (err) {
        res.status(500).json({ status: false, Error: err.message });
    }
}

const getMoviesTotal = (req, res) => {
    try {
        db.query(
            `SELECT IFNULL(genres, 'TOTAL') AS Genre, primaryTitle, SUM(numVotes) AS numVotes
       FROM movies m
       JOIN ratings r ON m.tconst = r.tconst
       GROUP BY Genre, primaryTitle WITH ROLLUP`,
            (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    res.status(500).json({ error: 'An error occurred' });
                } else {
                    res.json(results);
                }
            }
        );
    }
    catch (err) {
        res.status(500).json({ status: false, Error: err.message });
    }
}


const incrementRuntime = (req, res) => {
    try {
        db.query(
            `UPDATE movies
       SET runtimeMinutes = CASE
           WHEN genres = 'Documentary' THEN runtimeMinutes + 15
           WHEN genres = 'Animation' THEN runtimeMinutes + 30
           ELSE runtimeMinutes + 45
         END`,
            (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    res.status(500).json({ error: 'An error occurred' });
                } else {
                    res.json({ message: 'Runtime minutes updated successfully' });
                }
            }
        );
    }
    catch (err) {
        res.status(500).json({ status: false, Error: err.message });
    }
}


module.exports = { getLongestMovies, createMovie, getTopMovies, getMoviesTotal, incrementRuntime }