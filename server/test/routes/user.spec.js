// process.env.NODE_ENV = 'test';

// let user = require('../../routes/user');

//Require the dev-dependencies
// var assert = require('assert');
// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let app = require('../../app');
// let should = chai.should();


// chai.use(chaiHttp);

// var supertest = require("supertest");
// var should = require("should");
//
// var server = supertest.agent("http://localhost:3000");

var app = require('../../app');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

//TODO tests are broken debug them

describe('User', () => {

  it('should return version number', function(done) {
    request(app)
      .get('/api')
      .end(function(err, res) {
        console.log(res.statusCode);
        // expect(res.body.version).to.be.ok;
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it('should return status code 200', () => {
    request(app)
      .get("/api/users")
      .end(function(err,res){
        console.log(res.statusCode);
        // expect(res.body.version).to.be.ok;
        expect(res.statusCode).to.equal('puto');
        done();
      });
  });

  // describe('/GET users', () => {
  //   it('should return status code 200', () => {
  //     request(app)
  //     .get("/api/users")
  //     .end(function(err,res){
  //       console.log(res.statusCode);
  //       expect(res.body.version).to.be.ok;
  //       expect(res.statusCode).to.equal('puto');
  //       done();
  //     });
  //   });
  // });

  // describe('/POST users', () => {
  //   it('should return status code 400 when incorrect parameters are sent', () => {
  //     chai.request(app)
  //       .post('/api/users')
  //       .send({
  //         userName: 'jDoe',
  //         firstName: 'John',
  //         lastName: 'Doe'
  //       }).end((err, res) => {
  //       res.should.have.status(400);
  //       done();
  //     });
  //   });
  //
  //   it('should return status code 200 when correct parameters are sent', () => {
  //     chai.request(app)
  //       .post('/api/users')
  //       .send({
  //         userName: 'postTest',
  //         firstName: 'Post',
  //         lastName: 'Test',
  //         country: 'Mocha',
  //         email: 'post@test.com',
  //         birthdate: '1/1/1990',
  //         images: []
  //       }).end((err, res) => {
  //       res.should.have.status(200);
  //       done();
  //     });
  //   });
  //
  //   it('should return the expected body response when correct parameters are sent', () => {
  //     const expected ={
  //       id: 0,
  //       userName: 'postTest',
  //       firstName: 'Post',
  //       lastName: 'Test',
  //       country: 'Mocha',
  //       email: 'post@test.com',
  //       birthdate: '1/1/1990',
  //       images: []
  //     };
  //     chai.request(app)
  //       .post('/api/users')
  //       .send({
  //         userName: 'postTest',
  //         firstName: 'Post',
  //         lastName: 'Test',
  //         country: 'Mocha',
  //         email: 'post@test.com',
  //         birthdate: '1/1/1990',
  //         images: []
  //       }).end((err, res) => {
  //       res.body.should.equal(expected);
  //       done();
  //     });
  //   });
  // });
})
