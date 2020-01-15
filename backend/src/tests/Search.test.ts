/* global it, describe */
import request from 'supertest'

import app from '../app'

import searchMockResponse from './mocks/searchMock'

describe('Dev', () => {
  describe('index', () => {
    it('should list all devs near of specific location', done => {
      request(app)
        .get('/devs')
        .query({
          latitude: -23.5709704,
          longitude: -48.0307709
        })
        .expect(200, searchMockResponse)
        .end(done)
    })
  })
})
