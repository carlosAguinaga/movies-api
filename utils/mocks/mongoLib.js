const sinon = require('sinon');

const { moviesMock, filteredMoviesMock } = require('./movies');

const getAllStubs = sinon.stub();
getAllStubs.withArgs('movies').resolves(moviesMock);

const query = { tag: { $in: ['Drama'] } };
getAllStubs.withArgs('movies', query).resolves(filteredMoviesMock('Drama'));

const createStub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock {
  getAll(collection, query) {
    return getAllStubs(collection, query);
  }

  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStubs,
  createStub,
  MongoLibMock,
};
