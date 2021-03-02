const assert = require('assert');

const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStubs } = require('../utils/mocks/mongoLib');

const { moviesMock } = require('../utils/mocks/movies');

describe('Service - movies', () => {
  const MoviesServices = proxyquire('../services/movies', {
    '../lib/mongo': MongoLibMock,
  });

  const moviesService = new MoviesServices();

  describe('when getMovies method is called', async () => {
    it('should call the getAll Mongolib method', async () => {
      await moviesService.getMovies({});
      assert.strictEqual(getAllStubs.called, true);
    });

    it('should return an array of movies', async () => {
      const result = await moviesService.getMovies({});
      const expected = moviesMock;
      assert.deepStrictEqual(result, expected);
    });
  });
});
