/* global it, describe */
import app from '../app'

import request from 'supertest'

describe('Dev', () => {
  describe('index', () => {
    it('should list all devs', done => {
      request(app)
        .get('/devs')
        .expect(200)
        .end(done)
    })
  })

  describe('store', () => {
    const sendBody = {
      github_username: 'efraim-andrade',
      techs: 'ReactJS, NodeJS, React Native',
      latitude: -23.5709704,
      longitude: -48.0307709
    }

    it('should throw an error when user already exists', done => {
      request(app)
        .post('/devs')
        .send(sendBody)
        .expect(409)
        .end(done)
    })
  })
})
