//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//var request = require('supertest');
// var app = require('../app');
// var request = require("supertest").agent(app.listen());
//
// describe('homepage', function(){
//   it('welcomes the user', function(done){ //done parameter in function for async requests
//     request(app).get("/")
//       .expect(200)
//       .expect(/users/, done)
//   });
// });

let mongoose = require("mongoose");
let User = require('../models/user');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => {
           done();
        });
    });
/*
  * Test the /GET route
  */
  describe('/GET user', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  //res.body.length.should.be.eql(0);
                  res.body.should.be.empty
              done();
            });
      });
  });

  /*
  * Test the /POST route
  */

  describe('/POST user', () => {
        it('it should not POST a user without name field', (done) => {
            let user = {
                // name: "Abi Travers",
                email: "abi@gmail.com",
                country: "UK"
            }
            chai.request(server)
           .post('/user')
           .send(user)
           .end((err, res) => {
                 res.should.have.status(200);
                 res.body.should.be.a('object');
                 res.body.should.have.property('errors');
                 res.body.errors.should.have.property('name');
                 res.body.errors.pages.should.have.property('kind').eql('required');
             done();
           });
     });

 });
});
