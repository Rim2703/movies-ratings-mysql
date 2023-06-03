const getLongDurMovie = 'SELECT tconst, primaryTitle, runtimeMinutes, genres FROM movies ORDER BY runtimeMinutes DESC LIMIT 10';
const createMovie = 'INSERT INTO movies (tconst, titleType, primaryTitle, runtimeMinutes, genres) VALUES (?, ?, ?, ?, ?)';
const getTopMoviesByRating = 'SELECT m.tconst, m.primaryTitle, m.genres, r.averageRating FROM movies m JOIN ratings r ON m.tconst = r.tconst WHERE r.averageRating > 6.0 ORDER BY r.averageRating DESC';

module.exports = { getLongDurMovie, createMovie, getTopMoviesByRating }