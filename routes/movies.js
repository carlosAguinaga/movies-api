const express = require('express');
const MoviesService = require('../services/movies');
const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
} = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');

const moviesApi = (app) => {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesService = new MoviesService();

  router.get('/', async (req, res, next) => {
    const { tags } = req.query;
    try {
      const movies = await moviesService.getMovies({ tags });

      // throw new Error('Error getting movies')

      res.status(200).json({
        data: movies,
        message: 'movies listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async (req, res, next) => {
      const { movieId } = req.params;
      try {
        const movies = await moviesService.getMovie({ movieId });
        res.status(200).json({
          data: movies,
          message: 'movies retrived',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createMovieSchema),
    async (req, res, next) => {
      const { body: movie } = req;
      try {
        const createdMovieId = await moviesService.createMovie({ movie });
        res.status(201).json({
          data: createdMovieId,
          message: 'movie created',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),
    async (req, res, next) => {
      const { movieId } = req.params;
      const { body: movie } = req;
      try {
        const updateMovieId = await moviesService.updateMovie({
          movieId,
          movie,
        });
        res.status(200).json({
          data: updateMovieId,
          message: 'movies updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    try {
      const updateMovieId = await moviesService.deleteMovie({ movieId });
      res.status(200).json({
        data: updateMovieId,
        message: 'movies deleted',
      });
    } catch (err) {
      next(err);
    }
  });

  router.patch('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    const { body: movie } = req;
    try {
      const updatedMovieId = await moviesService.partialUpdateMovie({
        movieId,
        movie,
      });

      res.status(200).json({
        data: updatedMovieId,
        message: 'movie updated partially',
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = moviesApi;
