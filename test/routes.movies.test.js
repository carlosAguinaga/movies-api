const assert = require('assert');
const proxyquire = require('proxyquire');

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies');
const testServer = require('../utils/testServer');

describe('routes - movies', () => {
  const route = proxyquire('../routes/movies', {
    '../services/movies': MoviesServiceMock,
  });

  const request = testServer(route);

  describe('GET movies', () => {
    it('should respond with status 200', (done) => {
      request.get('/api/movies').expect(200, done);
    });

    it('Should responds with the list of movies', (done) => {
      request.get('/api/movies').end((err, res) => {
        assert.deepStrictEqual(res.body, {
        // assert.deepEqual(res.body, {
          data: moviesMock,
          message: 'movies listed',
        });

        done();
      });
    });
  });
});
