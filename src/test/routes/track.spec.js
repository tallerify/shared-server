process.env.NODE_ENV = 'test';

const app = require('../../app');
const db = require('../../database');
const tables = require('../../database/tableNames');
const dbHandler = require('../../handlers/db/generalHandler');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

const config = require('./../../config');
const constants = require('./track.constants.json');
const artistsConstants = require('./artist.constants.json');

const testToken = jwt.sign({ admin: true }, config.secret);

describe('Track', () => {

  beforeEach((done) => {
    db.migrate.rollback()
    .then(() => {
      db.migrate.latest()
      .then(() => done())
      .catch(error => done(error));
    });
  });

  afterEach((done) => {
    db.migrate.rollback()
    .then(() => done());
  });
  
  describe('/GET tracks', () => {
    it('should return status code 200', (done) => {
      request(app)
        .get('/api/tracks')
        .set('Authorization', `Bearer ${testToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should return the expected body response when correct parameters are sent', (done) => {
      request(app)
        .get('/api/tracks')
        .set('Authorization', `Bearer ${testToken}`)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('metadata');
          res.body.metadata.should.have.property('version');
          res.body.metadata.should.have.property('count');
          res.body.should.have.property('tracks');
          res.body.tracks.should.be.a('array');
          done();
        });
    });
  });

  describe('/POST tracks', () => {

    it('should return status code 400 when parameters are missing', (done) => {
      request(app)
        .post('/api/tracks')
        .set('Authorization', `Bearer ${testToken}`)
        .send(constants.newTrackWithMissingAttributes)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return status code 400 when parameters are invalid', (done) => {
      request(app)
        .post('/api/tracks')
        .set('Authorization', `Bearer ${testToken}`)
        .send(constants.invalidTrack)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return status code 201 when correct parameters are sent', (done) => {
      dbHandler.createNewEntry(tables.artists, artistsConstants.trackTestArtist)
      .then(() => {
        request(app)
          .post('/api/tracks')
          .set('Authorization', `Bearer ${testToken}`)
          .send(constants.testTrack)
          .end((err, res) => {
            res.should.have.status(201);
            done();
          });
      });
    });
  });
});