process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let User = require('../models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
    const correctUser = {
        username: "test@test.com",
        password: "test123"
    };
    const wrongUser = {
        password: "test123"
    };

    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        });
    });

    describe('/POST User Registration', () => {
        it('it should CREATE a User.', (done) => {
            chai.request(app)
                .post('/api/users/signup')
                .send(correctUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.success.should.be.equal(true);
                    res.body.should.have.property('msg');
                    res.body.msg.should.be.equal('Successful created new user.');
                    done();
                });
        });

        it('it should NOT CREATE a User because the inputs are wrong.', (done) => {
            chai.request(app)
                .post('/api/users/signup')
                .send(wrongUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.success.should.be.equal(false);
                    res.body.should.have.property('msg');
                    res.body.msg.should.be.equal('Please pass username and password.');
                    done();
                })
        });

        // it('it should NOT CREATE a User because of duplicate email.', (done) => {
        //     chai.request(app)
        //         .post('/api/users/signup')
        //         .send(correctUser)
        //         .end((err, res) => {
        //             console.log(res.body);
        //             res.should.have.status(200);
        //             res.body.should.be.a('object');
        //             res.body.should.have.property('success');
        //             res.body.success.should.be.equal(false);
        //             res.body.should.have.property('msg');
        //             res.body.msg.should.be.equal('Username already exists.');
        //             res.body.should.have.property('error');
        //             done();
        //         })
        // });
    });
});