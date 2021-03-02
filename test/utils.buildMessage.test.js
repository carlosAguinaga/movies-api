
const assert = require('assert')
const BuildMessage = require('../utils/buildMesage')

describe.only('Utils - build message', () => {
    describe('when recevies an entity and an action', () => {
        it('should return respective message', () =>{
            const result = BuildMessage('movie', 'create')
            const expect = 'movie created'
            assert.strictEqual(result, expect)
        })
    })
})

describe('when recevies an entity and an action and is a list', () => {
    it('Show return the respective message with the intity in plural', () => {
        const result = BuildMessage('movie', 'list')
        const expectd = 'movies listed'
        assert.strictEqual(result, expectd)
    })
})
